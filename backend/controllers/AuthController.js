import connection from "../db/dbConfig.js";
import bcrypt from "bcrypt"

const saltRounds = 10;

const AuthController = {

    register: async (req, res) => {
        const { email, password, nombre, id_tipo } = req.body;

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
                        const registerQuery = 'INSERT INTO users (correo, contraseña, nombre, id_tipo_usuarios) VALUES ( ?, ?, ?, ?)';
                        connection.query(registerQuery, [ email, hashedPassword, nombre, id_tipo], (err, response) => {
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
                        res.status(200).send('Inicio de sesion correcto')
                    } else {
                        res.status(401).send('Contrasaeña incorrecta')
                    }
                } else{
                    res.status(404).send('404 Not found - Usuario no encontrado')
                }
            }
        })
    }

};

export default AuthController;
