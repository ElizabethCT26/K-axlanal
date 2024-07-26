import connection from "../db/dbConfig.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const saltRounds = 10;



const AuthController = {

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
