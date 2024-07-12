import connection from '../db/dbConfig.js'

const ProductControllers = {

    createProduct: (req,res) => {
        try{
            const { nombre, precio, cantidad, descripcion, id_tienda, id_categoria } = req.body;
            const sql = 'INSERT INTO productos(nombre, precio, cantidad, descripcion, id_tienda, id_categoria) VALUES (?, ?, ?, ?, ?, ?)';

            if (!nombre || !precio || !cantidad || !descripcion || !id_tienda || !id_categoria) {
                return res.status(400).send('Los datos requeridos no han sido enviados o no se encuentran en el formato apropiado');
            }

            connection.query(sql, [nombre, precio, cantidad, descripcion, id_tienda, id_categoria], (err, results) => {
                if(err){
                    res.status(500).send('Fallo al agregar el producto');
                } else {
                    res.status(200).send('Producto agregado correctamente');
                }
            });
        } catch (error){
            console.log(error);
            res.status(500).send('Error interno');
        }
    },

    getProducts: (req,res) => {
        try{
            const sql = 'SELECT * FROM view_products ORDER BY id DESC;';

            connection.query(sql, (err, results) => {
                if(err){
                    res.status(500).send('Fallo al recuperar productos');
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
            const sql = 'SELECT * FROM view_products ORDER BY popularidad DESC';

            connection.query(sql, (err, results) => {
                if(err){
                    res.status(500).send('Fallo al recuperar productos populares');
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
            const sql = 'SELECT * FROM view_products ORDER BY fecha DESC';

            connection.query(sql, (err, results) => {
                if(err){
                    res.status(500).send('Fallo al recuperar productos más recientes');
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

    getDiscounts: (req,res) => {
        try{
            const sql = 'SELECT * FROM view_products WHERE descuento > 0 ORDER BY fecha DESC;';

            connection.query(sql, (err, results) => {
                if(err){
                    res.status(500).send('Fallo al recuperar descuentos');
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


    getProduct: (req,res) => {
        try{
            const { id } = req.params
            const sql = 'SELECT * FROM productos WHERE id = ?';

            connection.query(sql, id, (err, results) => {
                if(err){
                    res.status(500).send('Fallo al recuperar producto');
                } else {
                    if(results == 0){
                        res.status(404).send('No se ha encontrado el producto solicitado - Error 404');
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
    getStorePopular: (req,res) => {
        try{
            const { id } = req.params;
            const sql = 'SELECT * FROM view_products WHERE id_tienda = ? ORDER BY popularidad DESC';

            connection.query(sql,id, (err, results) => {
                if(err){
                    res.status(500).send('Fallo al recuperar productos populares');
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
    getStorePopular: (req,res) => {
        try{
            const { id } = req.params;
            const sql = 'SELECT * FROM view_products WHERE id_tienda = ? ORDER BY popularidad DESC';

            connection.query(sql,id, (err, results) => {
                if(err){
                    res.status(500).send('Fallo al recuperar productos populares');
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

    updateProduct: (req,res) => {
        try{
            const {id} = req.params;
            const { nombre, precio, cantidad, descripcion, id_tienda, id_categoria } = req.body;
            const sql = 'UPDATE productos SET nombre = ?, precio = ?, cantidad = ?, descripcion = ?, id_tienda = ?, id_categoria = ? WHERE id = ?';

            if (!nombre || !precio || !cantidad || !descripcion || !id_tienda || !id_categoria) {
                return res.status(400).send('Los datos requeridos no han sido enviados o no se encuentran en el formato apropiado');
            }

            connection.query(sql, [nombre, precio, cantidad, descripcion, id_tienda, id_categoria, id], (err, results) => {
                if(err){
                    res.status(500).send('Fallo al actualizar el producto');
                    console.log(err)
                } else {
                    res.status(200).send('Producto actualizado correctamente');
                }
            });
        } catch (error){
            console.log(error);
            res.status(500).send('Error interno');
        }
    },

    deleteProduct: (req,res) => {
        try{
            const {id} = req.params;
            const sql = 'DELETE FROM productos WHERE id = ?';

            connection.query(sql, id, (err, results) => {
                if(err){
                    res.status(500).send('Fallo al eliminar el producto');
                } else {
                    res.status(200).send('Producto eliminado correctamente');
                }
            });
        } catch (error){
            console.log(error);
            res.status(500).send('Error interno');
        }
    },

}


export default ProductControllers