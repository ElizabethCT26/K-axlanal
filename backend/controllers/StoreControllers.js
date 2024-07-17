import connection from '../db/dbConfig.js'

const StoreControllers = {

    createStore: (req,res) => {
        console.log(req.body)
        const banner_path = `/uploads/${req.files[1].filename}`
        const profile_path = `/uploads/${req.files[0].filename}`
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
                    console.log(idInsert)
                    connection.query(insertSql, [nombre , descripcion, id_propietario,  contacto,  id_areaComercial , idInsert], (err, resultsQuery) => {
                        if(err){
                            res.status(500).send('Fallo al agregar la tienda');
                            console.error(err)
                        } else {
                            console.log(resultsQuery)
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
            console.log(req.body)
            const {id} = req.params;
            const { nombre, categoria, descripcion, id_categoria, id_propietario} = req.body;
            const sql = 'UPDATE tiendas SET nombre = ? WHERE id = ?';

            if (!nombre || !id) {
                return res.status(400).send('Los datos requeridos no han sido enviados o no se encuentran en el formato apropiado');
            }

            connection.query(sql, [nombre, id], (err, results) => {
                if(err){
                    res.status(500).send('Fallo al actualizar la tienda');
                } else {
                    res.status(200).send('Tienda actualizada correctamente');
                }
            });
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
                    console.log(err)
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