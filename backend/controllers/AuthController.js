import connection from "../db/dbConfig.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import dotenv from 'dotenv';
import crypto from 'crypto'
import { send } from "process";

dotenv.config({path: 'dev.env'});

const saltRounds = 10;

    const sendMail = (email, emailToken) => {
        const transporter = nodemailer.createTransport({
            service: 'Outlook365',
            host: 'smtp.office365.com',
            port: 587,
            secure: false, 
            auth: {
                user: process.env.NM_EMAIL, 
                pass:  process.env.NM_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.NM_EMAIL,
            to: email,
            subject: 'Por favor, verifique su email',
            html:`<p>Hola, desde el equipo de kaxlanal, enviamos este correo para pedirle que verifique su cuenta, puede hacerlo dando clicke en el siguiente enlace</p>
            <br>
            <a href="https://localhost:5173/verificar/${emailToken}">Click aqui para verificar</a>
            `
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });
    
    }

    const sendPasswordRecovery = (email, emailToken) => {
        const transporter = nodemailer.createTransport({
            service: 'Outlook365',
            host: 'smtp.office365.com',
            port: 587,
            secure: false, 
            auth: {
                user: process.env.NM_EMAIL, 
                pass:  process.env.NM_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.NM_EMAIL,
            to: email,
            subject: 'Cambio de contraseña',
            html:`<p>Hola, desde el equipo de kaxlanal, enviamos este correo para con motivo de su reciente petición de cambio de contraseña puede hacerlo dando clicke en el siguiente enlace</p>
            <br>
            <a href="https://localhost:5173/restablecer-contraseña/${emailToken}">Click aqui para cambiar contraseña</a>
            `
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });
    
    }



const AuthController = {


    register: async (req, res) => {
        const { email, password, nombre, apellido, id_tipo } = req.body;

        const token = crypto.randomBytes(20).toString('hex');

        try{
            const hashedPassword =  await bcrypt.hash(password, saltRounds);
            const emailCheckQuery = 'SELECT * FROM USERS WHERE correo = ?';

            connection.query(emailCheckQuery,email, (err, verification) => {
                if(err){
                    console.log(err)
                    res.status(500).send('Algo ha salido mal.');
                } else {
                    if(verification.length > 0){
                        res.status(409).send('El email ya ha sido registrado');
                    } else {
                        const registerQuery = 'INSERT INTO users (correo, contraseña, nombre, apellido, id_tipo_usuarios, mailToken) VALUES ( ?, ?, ?, ?, ?, ?)';
                        connection.query(registerQuery, [ email, hashedPassword, nombre, apellido, id_tipo, token], (err, response) => {
                            if(err){
                                console.log(err)
                                res.status(500).send('Algo salio mal');
                            }else{
                                sendMail(email, token)
                                res.status(200).send('Usuario registrado correctamente, por favor, verifique email');
                            }
                        })
                    }
                }
            })
        }catch(error){
            console.log(error)
            res.status(500).send('Error interno del servidor')
        }

    },

    sendMailAgain: async (req,res) => {
        const { email } = req.body;

        try{
            const query = 'SELECT * FROM USERS WHERE correo = ?';
            connection.query(query, email, (err, response) => {
                if(err){
                    res.status(500).send('Algo ha salido mal.');
                } else {
                    if(response.length <= 0){
                        res.status(404).send('404 Not found - Usuario no encontrado')
                    } else {
                        const data = response[0]
                        sendMail(data.correo, data.mailToken)
                        res.status(200).send('Correo enviado exitosamente')
                    }
                }
            })
        } catch(error){
            res.status(500).send('Algo ha salido mal.');
        }
    },

    verifyEmail: async (req,res) => {
        const { token } = req.body

        
        try{
            const tokenCheckQuery = 'SELECT * FROM USERS WHERE mailToken = ?';

            connection.query(tokenCheckQuery,token, (err, verification) => {
                if(err){
                    res.status(500).send('Algo ha salido mal.');
                } else {
                    if(verification.length <= 0){
                        res.status(409).send('No se han encontrado registros');
                    } else {
                        const verify = 'UPDATE users SET isItVerified = 1, mailToken = NULL WHERE id = ?'
                        connection.query(verify, verification[0].id , (err, response) => {
                            if(err){
                                res.status(500).send('Algo salio mal');
                            }else{
                                res.status(200).send('Usuario verificado correctamente, por favor, inidice sesion');
                            }
                        })
                    }
                }
            })
        }catch(error){
            res.status(500).send('Error interno del servidor')
        }
    },

    verifyRestore: (req, res) => {
        const { token } = req.body

        const query = 'UPDATE users SET contraseña = ? WHERE id = ?'

        jwt.verify(token, 'panqueque', (err, decoded) => {
            if(err){
                console.log(err)
                return res.status(401).send('token invalido')
            }

            try {
                connection.query(query, [decoded.newPassword, decoded.id], (err, response) => {
                    if(err){
                        res.status(500).send('Algo salio mal');
                    }else{
                        res.status(200).send('Contraseña cambiada correctamente');
                    }
                })

            } catch (error) {
                console.log(error)
            }
        })


    },


    login: async (req, res) => {
        const { email, password } = req.body;
        const searchQuery = 'SELECT * FROM users WHERE correo = ?'

        connection.query(searchQuery, email, async (err, response) => {
            if(err){
                res.status(500).send('Algo ha salido mal.')
            } else{
                if(response.length > 0 ){
                    const hash = response[0].contraseña
                    const match = await bcrypt.compare(password, hash);
                    if(match){
                        const token = jwt.sign({
                            name: response[0].nombre,
                            id: response[0].id,
                            email: response[0].correo,
                            type: response[0].id_tipo_usuarios
                        }, 'panqueque')
                        res.cookie('auth_token', token, {
                            httpOnly: true,
                            secure: true,
                            sameSite: 'Strict',
                            path: '/'
                        });
                        res.status(200).send({ message: 'Inicio de sesion exitoso', userType: response[0].id_tipo_usuarios, userId: response[0].id})
                    } else {
                        res.status(401).send('Contraseña incorrecta')
                    }
                } else{
                    res.status(404).send('404 Not found - Usuario no encontrado')
                }
            }
        })
    },

    logout: async (req, res) => {
        res.clearCookie('auth_token', { path: '/' });
        res.status(200).send('Sesión cerrada con éxito.');
    },

    restorePassword: async (req,res) => {
       
            const { email, newPassword } = req.body;
            const searchQuery = 'SELECT * FROM users WHERE correo = ?'
            
    
            connection.query(searchQuery, email, async (err, response) => {
                if(err){
                    res.status(500).send('Algo ha salido mal.')
                } else{
                    if(response.length > 0 ){
                        console.log(response)
                        const newHash = await bcrypt.hash(newPassword, saltRounds)
                        const token = jwt.sign({
                            email: email,
                            newPassword: newHash,
                            id: response[0].id
                        }, 'panqueque')
                        sendPasswordRecovery(email, token)
                        res.status(200).send('Correo enviado exitosamente')
                    } else{
                        res.status(404).send('404 Not found - Usuario no encontrado')
                    }
                }
            })
    },

    getUserData: async (req, res) => {
        try {
            res.status(200).send({ userId: req.userId, userType: req.userType })
        } catch (error) {
            console.log('getUserData failed')
        }
    }

};

export default AuthController;
