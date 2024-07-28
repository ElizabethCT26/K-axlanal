import connection from "../db/dbConfig.js";

const FavoriteController = {
        // Stores of Favorites

        addFavorite: (req,res) => {
            try{
                
                const id_producto  = req.body.productId
                const id_usuario = req.userId
                const sql = 'INSERT INTO favoritos ( id_producto, id_usuario ) VALUES ( ?, ? )'
    
                connection.query(sql, [ id_producto, id_usuario ], (err, results) => {
                    if(err){
                        res.status(500).send('Fallo al agregar a "Favoritos"');
                        console.log(err)
                    } else {
                        res.status(200).send('Agregado correctamente a "Favoritos"');
                    }
                })
            } catch(error){
                console.log(error);
                res.status(500).send('Error interno')
                console.log(error)
            }
        },
    
        deleteFavorite: (req,res) => {
            try{
                const { id_producto }  = req.params
                const id_usuario = req.userId
                const sql = 'DELETE FROM favoritos WHERE id_producto = ? AND id_usuario = ?'

                console.log(id_producto, id_usuario)
    
                connection.query(sql, [ id_producto, id_usuario ], (err, results) => {
                    if(err){
                        res.status(500).send('Fallo al eliminar de "Favoritos"');
                    } else {
                        console.log(results)
                        if(results.affectedRows > 0){
                            res.status(200).send('Eliminado correctamente de "Favoritos"');
                        } else {
                            res.status(404).send('No se ha encontrado el "Favoritos"');
                        }
                    }
                })
            } catch(error){
                console.log(error);
                res.status(500).send('Error interno')
            }
        },
    
        getFavoritesbyUser: (req,res) => {
            try{
                const id = req.userId
                const sql = 'SELECT * FROM favoritos WHERE id_usuario = ?'
    
                connection.query(sql, id, (err, results) => {
                    if(err){
                        res.status(500).send('Fallo al encontrar resultados para "Favoritos"');
                    } else {
                        res.status(200).send(results);
                    }
                })
            } catch(error){
                console.log(error);
                res.status(500).send('Error interno')
            }
        },
    
        getFavoritesbyProduct: (req,res) => {
            try{
                const { id } = req.params
                const sql = 'SELECT * FROM favoritos WHERE id_producto = ?'
    
                connection.query(sql, id, (err, results) => {
                    if(err){
                        res.status(500).send('Fallo al encontrar resultados para "Favoritos"');
                    } else {
                        res.status(200).send(results);
                    }
                })
            } catch(error){
                console.log(error);
                res.status(500).send('Error interno')
            }
        }
}

export default FavoriteController