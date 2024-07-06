import connection from "../db/dbConfig.js";

const FavoriteController = {
        // Stores of Favorites

        addFavorite: (req,res) => {
            try{
                const { id_producto, id_usuario } = req.params
                const sql = 'INSERT INTO favoritos ( id_producto, id_usuario ) VALUES ( ?, ? )'
    
                connection.query(sql, [ id_producto, id_usuario ], (err, results) => {
                    if(err){
                        res.status(500).send('Fallo al agregar a "Favoritos"');
                    } else {
                        res.status(200).send('Agregado correctamente a "Favoritos"');
                    }
                })
            } catch(error){
                console.log(error);
                res.status(500).send('Error interno')
            }
        },
    
        deleteFavorite: (req,res) => {
            try{
                const { id_producto, id_usuario } = req.params
                const sql = 'DELETE FROM favoritos WHERE id_producto = ? AND id_usuario = ?'
    
                connection.query(sql, [ id_producto, id_usuario ], (err, results) => {
                    if(err){
                        res.status(500).send('Fallo al eliminar de "Favoritos"');
                    } else {
                        res.status(200).send('Eliminado correctamente de "Favoritos"');
                    }
                })
            } catch(error){
                console.log(error);
                res.status(500).send('Error interno')
            }
        },
    
        getFavoritesbyUser: (req,res) => {
            try{
                const { id } = req.params
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