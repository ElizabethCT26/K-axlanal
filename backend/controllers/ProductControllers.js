import connection from '../db/dbConfig.js'

const ProductControllers = {

    createProduct: (req,res) => {
        try{
            const { nombre, precio, cantidad, descripcion, id_propietario, id_categoria } = req.body;
            const IMGpath = `/uploads/${req.file.filename}`;

            const storeIdSQL = 'SELECT * FROM tiendas WHERE id_propietario = ?;'
            const sql = 'INSERT INTO productos(nombre, precio, cantidad, descripcion, id_tienda, id_categoria, img_path) VALUES (?, ?, ?, ?, ?, ?, ?)';

            connection.query(storeIdSQL, id_propietario, (err, results)=>{
                if(err){
                    console.error(err)
                    res.status(500).send('Fallo al agregar el producto');
                } else {
                    console.log(results)
                    if(results.length > 0){
                        const id_tienda = results[0].id

                        if (!nombre || !precio || !cantidad || !descripcion || !id_categoria) {
                            return res.status(400).send('Los datos requeridos no han sido enviados o no se encuentran en el formato apropiado');
                        }
                        connection.query(sql, [nombre, precio, cantidad, descripcion, id_tienda, id_categoria, IMGpath], (err, results) => {
                            if(err){
                                console.error(err)
                                res.status(500).send('Fallo al agregar el producto');
                            } else {
                                res.status(200).send('Producto agregado correctamente');
                            }
                        });
                    } else {
                        res.status(500).send('Fallo al agregar el producto');
                    }

                }
            })
            
        } catch (error){
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

    getLatestbyStore: (req,res) => {
        try{
            const { id } = req.params;
            const sql = 'SELECT * FROM view_products WHERE id_tienda = ? ORDER BY fecha DESC';

            connection.query(sql, id, (err, results) => {
                if(err){
                    res.status(500).send('Fallo al recuperar productos más recientes de esta tienda');
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
            const sql = 'SELECT * FROM view_products WHERE porcentaje > 0 ORDER BY fecha DESC;';

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

    getDiscountsbyStore: (req,res) => {
        try{
            const { id } = req.params
            const sql = 'SELECT * FROM view_products WHERE porcentaje > 0 AND id_tienda = ? ORDER BY fecha DESC;';

            connection.query(sql, id, (err, results) => {
                if(err){
                    console.log(err)
                    res.status(500).send('Fallo al recuperar descuentos de tienda');
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
            const sql = 'SELECT * FROM view_products WHERE id = ?';

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

    getProductEdit: (req,res) => {
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

    getByCategory: (req,res) => {
        try{
            const { id } = req.params;
            const sql = 'SELECT * FROM view_products WHERE id_categoria = ? ORDER BY popularidad DESC';

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

    updateProduct: (req, res) => {
        console.log(req.body);
        try {
            const { id } = req.params;
            let IMGpath;
            if (req.file) {
                IMGpath = `/uploads/${req.file.filename}`;
            }
    
            const { nombre, precio, cantidad, descripcion, id_categoria } = req.body;
            const sql = 'UPDATE productos SET nombre = ?, precio = ?, cantidad = ?, descripcion = ?, id_categoria = ? WHERE id = ?';
            const sqlImage = 'UPDATE productos SET nombre = ?, precio = ?, cantidad = ?, descripcion = ?, id_categoria = ?, img_path = ? WHERE id = ?';
    
            if (!nombre || !precio || !cantidad || !descripcion || !id_categoria) {
                return res.status(400).send('Los datos requeridos no han sido enviados o no se encuentran en el formato apropiado');
            }
    
            const query = req.file ? sqlImage : sql;
            const params = req.file ? [nombre, precio, cantidad, descripcion, id_categoria, IMGpath, id] : [nombre, precio, cantidad, descripcion, id_categoria, id];
    
            connection.query(query, params, (err, results) => {
                if (err) {
                    res.status(500).send('Fallo al actualizar el producto');
                    console.log(err);
                } else {
                    res.status(200).send('Producto actualizado correctamente');
                }
            });
        } catch (error) {
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
                    console.error(err)
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