import connection from '../db/dbConfig.js'

const StoreControllers = {

    createStore: (req,res) => {
        const banner_path = `/uploads/${req.files.banner[0].filename}`
        const profile_path = `/uploads/${req.files.profile[0].filename}`
        console.log(req.body)
        try{
            const { nombre, id_propietario, descripcion, contacto, id_areaComercial } = req.body;
            const sql = 'INSERT INTO images (profile_path, banner_path) VALUES ( ?, ?)';
            const insertSql = 'INSERT INTO tiendas(nombre, descripcion, id_propietario, contacto, id_areaComercial, id_img) VALUES (?, ?, ?, ?, ?, ?)'

            if (!nombre || !id_propietario) {
                return res.status(400).send('Los datos requeridos no han sido enviados o no se encuentran en el formato apropiado');
            }

            connection.query(sql, [profile_path, banner_path, ], (err, results) => {
                if(err){
                    res.status(500).send('Fallo al agregar imagenes');
                } else {
                    const idInsert = results.insertId
                    connection.query(insertSql, [nombre , descripcion, id_propietario,  contacto,  id_areaComercial , idInsert], (err, resultsQuery) => {
                        if(err){
                            res.status(500).send('Fallo al agregar la tienda');
                        } else {
                            res.status(200).send({message: "Tienda agregada correctamente", id: resultsQuery.insertId});
                        }
                    });
                }
            });
        } catch (error){
            console.log(error);
            res.status(500).send('Error interno');
        }
    },

    getStores: (req,res) => {
        try{
            const sql = 'SELECT * FROM view_stores';

            connection.query(sql, (err, results) => {
                if(err){
                    res.status(500).send('Fallo al recuperar tiendas');
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

    getLatest: (req,res) => {
        try{
            const sql = 'SELECT * FROM view_stores ORDER BY fecha DESC';

            connection.query(sql, (err, results) => {
                if(err){
                    res.status(500).send('Fallo al recuperar tiendas');
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

    getPopular: (req,res) => {
        try{
            const sql = 'SELECT * FROM view_stores ORDER BY popularidad DESC';

            connection.query(sql, (err, results) => {
                if(err){
                    console.log(err)
                    res.status(500).send('Fallo al recuperar tiendas');
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

    getStore: (req,res) => {
        try{
            const { id } = req.params
            const sql = 'SELECT * FROM view_stores WHERE id = ?';

            connection.query(sql, id, (err, results) => {
                if(err){
                    res.status(500).send('Fallo al recuperar tienda');
                } else {
                    if(results == 0){
                        res.status(404).send('No se ha encontrado la tienda solicitada - Error 404');
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

    getStoreEdit: (req,res) => {
        try{
            const { id } = req.params
            const sql = 'SELECT * FROM view_stores WHERE id = ?';

            connection.query(sql, id, (err, results) => {
                if(err){
                    res.status(500).send('Fallo al recuperar tienda');
                } else {
                    if(results == 0){
                        res.status(404).send('No se ha encontrado la tienda solicitada - Error 404');
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

    getBusinessArea: (req,res) => {
        try{
            const sql = 'SELECT * FROM area_comercial';

            connection.query(sql, (err, results) => {
                if(err){
                    res.status(500).send('Fallo al recuperar areas comerciales');
                } else {
                    if(results.length == 0){
                        res.status(404).send('No se ha encontrado la informacion solicitada - Error 404');
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

    getStoreByOwner: (req,res) => {
        try{
            const { id } = req.params
            const sql = 'SELECT * FROM view_stores WHERE id_propietario = 1;';

            connection.query(sql, id, (err, results) => {
                if(err){
                    res.status(500).send('Fallo al recuperar tienda');
                } else {
                    if(results == 0){
                        res.status(404).send('No se ha encontrado la tienda solicitada - Error 404');
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
    updateStore: (req,res) => {
        try{
            const {id} = req.params;
            const { nombre, contacto, descripcion, id_areaComercial, id_img } = req.body;
            
            const banner_path = req.files['banner'] ? `/uploads/${req.files.banner[0].filename}` : null
            const profile_path = req.files['profile'] ? `/uploads/${req.files.profile[0].filename}` : null
            let ImgSql = 'UPDATE images SET';
            let updateFields = [];
            let updateParams = [];

            if(banner_path != null){
                updateFields.push('banner_path = ?');
                updateParams.push(banner_path);

            };
            if(profile_path != null){
                updateFields.push('profile_path = ?');
                updateParams.push(profile_path);
            };
            
            const sql = 'UPDATE tiendas SET nombre = ?, contacto = ?, descripcion = ?, id_areaComercial = ?  WHERE id = ?';
            ImgSql += ` ${updateFields.join(', ')} WHERE id = ?`;
            updateParams.push(id_img);
            if (!nombre || !id) {
                return res.status(400).send('Los datos requeridos no han sido enviados o no se encuentran en el formato apropiado');
            }

            if(banner_path || profile_path){
                connection.query(ImgSql, updateParams, (err, results) => {
                    if(err){
                        res.status(500).send('Fallo al actualizar la tienda');
                    } else {
                        connection.query(sql, [nombre, contacto, descripcion, id_areaComercial, id_img, id], (err, results) => {
                            if(err){
                                res.status(500).send('Fallo al actualizar la tienda');
                            } else {
                                res.status(200).send('Tienda actualizada correctamente');
                            }
                        });
                    }
                });
            } else {
                connection.query(sql, [nombre, contacto, descripcion, id_areaComercial, id_img, id], (err, results) => {
                    if(err){
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

    deleteStore: (req,res) => {
        try{
            const {id} = req.params;
            const sql = 'DELETE FROM tiendas WHERE id = ?';
            connection.query(sql, id, (err, results) => {
                if(err){
                    res.status(500).send('Fallo al eliminar la tienda');
                } else {
                    res.status(200).send('Tienda eliminada correctamente');
                }
            });
        } catch (error){
            console.log(error);
            res.status(500).send('Error interno');
        }
    }

}


export default StoreControllers