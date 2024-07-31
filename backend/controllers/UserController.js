import connection from "../db/dbConfig.js";

const Usercontroller = {

    getProfile: (req, res) => {
        const { id }= req.params
        try{
            const sql = 'SELECT * FROM view_profile WHERE id = ?';

            connection.query(sql,[id], (err, results) => {
                if(err){
                    res.status(500).send('Fallo al recuperar perfil de usuario');
                } else {
                    if(results == 0){
                        res.status(404).send('No se ha encontrado nada - Error 404');
                    } else {
                        res.status(200).send(results);
                    }
                }
            });
        } catch (error){
            console.log(error);
            res.status(500).send('Error interno');
        }
    },

    getUser: (req, res) => {
        const  id = req.userId
        try{
            const sql = 'SELECT u.* , i.profile_path FROM users AS u LEFT JOIN images AS i ON u.id_img = i.id WHERE u.id = ?;';

            connection.query(sql,[id], (err, results) => {
                if(err){
                    
                    res.status(500).send('Fallo al recuperar perfil de usuario');
                } else {
                    if(results == 0){
                        res.status(404).send('No se ha encontrado nada - Error 404');
                    } else {
                        res.status(200).send(results);
                    }
                }
            });
        } catch (error){
            console.log(error);
            res.status(500).send('Error interno');
        }
    },


    getProfiles: (req, res) => {
        const { id }= req.params
        try{
            const sql = 'SELECT * FROM users';

            connection.query(sql,[id], (err, results) => {
                if(err){
                    res.status(500).send('Fallo al recuperar perfil de usuario');
                } else {
                    if(results == 0){
                        res.status(404).send('No se ha encontrado nada - Error 404');
                    } else {
                        res.status(200).send(results);
                    }
                }
            });
        } catch (error){
            console.log(error);
            res.status(500).send('Error interno');
        }
    },
    deleteProfiles: (req,res) => {

        console.log(req.params)

        try{
            const { id } = req.params;
            const sql = 'DELETE FROM users WHERE id = ?';
            const sqlStore = 'Update tiendas set id_propietario = null where id_propietario = ?'

            connection.query(sqlStore, id, (err, results) => {
                if(err){
                    console.log(err)
                    res.status(500).send('Fallo al eliminar al usuario');
                } else {
                    connection.query(sql, id, (err, results) => {
                        if(err){
                            console.log(err)
                            res.status(500).send('Fallo al eliminar al usuario');
                        } else {
                            res.status(200).send('Usuario eliminado correctamente');
                        }
                })
                }
            });
        } catch (error){
            console.log(error);
            res.status(500).send('Error interno');
        }
    },

    updateProfile: (req,res) => {
        try{
            const id = req.userId;
            console.log(req.body)
            const { nombre, apellido, descripcion, telefono, correo } = req.body;
            let { id_img } = req.body;

            const img_path = req.file ? `/uploads/${req.file.filename}` : null;

            let ImgSql = id_img != 'null' ? `UPDATE images SET profile_path = ? WHERE id = ${id_img} ` : 'INSERT INTO images (profile_path) VALUES ( ? )'
            let sql = 'UPDATE users SET nombre = ?, apellido = ?, descripcion = ?, telefono = ?, correo = ?, id_img = ?  WHERE id = ?';

            if (!nombre || !id) {
                //return res.status(400).send('Los datos requeridos no han sido enviados o no se encuentran en el formato apropiado');
            }

            if(img_path){
                connection.query(ImgSql, img_path, (err, results) => {
                    if(err){
                        console.error(err)
                        res.status(500).send('Fallo al actualizar la tienda');
                    } else {
                        console.log(results)
                        
                        if(id_img == 'null'){
                            id_img = results.insertId
                        }
                        connection.query(sql, [nombre, apellido, descripcion, telefono,correo, id_img,id], (err, results) => {
                            if(err){
                                
                                res.status(500).send('Fallo al actualizar la tienda');
                                console.error(err)
                            } else {
                                res.status(200).send('Tienda actualizada correctamente');
                            }
                        });
                    }
                });
            } else {
                if(id_img == 'null'){
                    id_img = null
                }
                connection.query(sql, [nombre, apellido, descripcion, telefono,correo, id_img,id], (err, results) => {
                    if(err){
                        console.error(err)
                        res.status(500).send('Fallo al actualizar la tienda');
                    } else {
                        res.status(200).send('Tienda actualizada correctamente');
                    }
                });
            }
            
        } catch (error){
            console.log(error);
            res.status(500).send('Error interno');
        }
    },

    checkStore: (req, res) => {
        const id = req.userId
        try{
            const sql = 'SELECT * FROM view_stores WHERE id_propietario = ?';

            connection.query(sql,[id], (err, results) => {
                if(err){
                    res.status(500).send('Fallo al recuperar perfil de usuario');
                } else {
                    if(results == 0){
                        res.status(404).send('No se ha encontrado nada - Error 404');
                    } else {
                        res.status(200).send(results);
                    }
                }
            });
        } catch (error){
            console.log(error);
            res.status(500).send('Error interno');
        }
    },


}

export default Usercontroller