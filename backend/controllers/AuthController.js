import connection from "../db/dbConfig.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"

const saltRounds = 10;

    const sendMail = () => {
        const transporter = nodemailer.createTransport({
            service: "Outlook365",
            host: "smtp.office365.com",
            port: 587,
            secure: false, 
            auth: {
                user: "dorersempai@outlook.com", 
                pass: "YoloOmolo"     
            }
        });

        const mailOptions = {
            from: "dorersempai@outlook.com",
            to: 'mariaelizabethchuctun@gmail.com',
            subject: 'Por favor, verifique su email',
            html:`<p>Hola, desde el equipo de kaxlanal, enviamos este correo para pedirle que verifique su cuenta, puede hacerlo dando clicke en el siguiente enlace</p>
            <br>
            <a href="http://localhost:5173/verificar?emailToken=${emailToken}">Click aqui para verificar</a>
            `
    
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('oa?')
            console.log('Message sent: %s', info.messageId);
        });
    
    }



const AuthController = {

    firstTestcontroller: (req, res) => {
        console.log('oa')
        sendMail()
    },


    register: async (req, res) => {
        const { email, password, nombre, apellido, id_tipo } = req.body;
        try{
            const hashedPassword =  await bcrypt.hash(password, saltRounds);
            const emailCheckQuery = 'SELECT * FROM USERS WHERE correo = ?';

            connection.query(emailCheckQuery,email, (err, verification) => {
                if(err){
                    res.status(500).send('Algo ha salido mal.');
                } else {
                    if(verification.length > 0){
                        res.status(409).send('El email ya ha sido registrado');
                    } else {
                        const registerQuery = 'INSERT INTO users (correo, contraseña, nombre, apellido, id_tipo_usuarios) VALUES ( ?, ?, ?, ?, ?)';
                        connection.query(registerQuery, [ email, hashedPassword, nombre, apellido, id_tipo], (err, response) => {
                            if(err){
                                res.status(500).send('Algo salio mal');
                            }else{
                                res.status(200).send('Usuario registrado correctamente');
                            }
                        })
                    }
                }
            })
        }catch(error){
            res.status(500).send('Error interno del servidor')
        }

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

                        console.log(response[0]);
                        
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

    getUserData: async (req, res) => {
        try {
            res.status(200).send({ userId: req.userId, userType: req.userType })
        } catch (error) {
            console.log('getUserData failed')
        }
    }

};

export default AuthController;
