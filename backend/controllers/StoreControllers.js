import connection from '../db/dbConfig.js'

const StoreControllers = {

    createStore: (req,res) => {
        try{
            const { nombre, id_propietario } = req.body;
            const sql = 'INSERT INTO tiendas(nombre, id_propietario) VALUES (?, ?)';

            if (!nombre || !id_propietario) {
                return res.status(400).send('Los datos requeridos no han sido enviados o no se encuentran en el formato apropiado');
            }

            connection.query(sql, [nombre, id_propietario], (err, results) => {
                if(err){
                    res.status(500).send('Fallo al agregar la tienda');
                } else {
                    res.status(200).send('Tienda agregada correctamente');
                }
            });
        } catch (error){
            console.log(error);
            res.status(500).send('Error interno');
        }
    },

    getStores: (req,res) => {
        try{
            const sql = 'SELECT * FROM tiendas';

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
            const sql = 'SELECT * FROM tiendas WHERE id = ?';

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
            const { nombre } = req.body;
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
                    res.status(500).send('Fallo al eliminar la tienda');
                } else {
                    res.status(200).send('Tienda eliminada correctamente');
                }
            });
        } catch (error){
            console.log(error);
            res.status(500).send('Error interno');
        }
    },


    // Stores of interest -- POST AND DELETE

    addInterest: (req,res) => {
        try{
            const { id_tienda, id_usuario } = req.params
            const sql = 'INSERT INTO interesados ( id_tienda, id_usuario ) VALUES ( ?, ? )'

            connection.query(sql, [ id_tienda, id_usuario ], (err, results) => {
                if(err){
                    res.status(500).send('Fallo al agregar a "Tiendas de interes"');
                } else {
                    res.status(200).send('Agregado correctamente a "Tiendas de interes"');
                }
            })
        } catch(error){
            console.log(error);
            res.status(500).send('Error interno')
        }
    },

    deleteInterest: (req,res) => {
        try{
            const { id_tienda, id_usuario } = req.params
            const sql = 'DELETE FROM interesados WHERE id_tienda = ? AND id_usuario = ?'

            connection.query(sql, [ id_tienda, id_usuario ], (err, results) => {
                if(err){
                    res.status(500).send('Fallo al eliminar de "Tiendas de interes"');
                } else {
                    res.status(200).send('Eliminado correctamente de "Tiendas de interes"');
                }
            })
        } catch(error){
            console.log(error);
            res.status(500).send('Error interno')
        }
    }
}


export default StoreControllers