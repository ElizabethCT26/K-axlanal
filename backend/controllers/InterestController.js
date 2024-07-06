import connection from "../db/dbConfig.js";


const InterestController = {
        // Stores of interest

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
        },
    
        getInterestbyUser: (req,res) => {
            try{
                const { id } = req.params
                const sql = 'SELECT * FROM interesados WHERE id_usuario = ?'
    
                connection.query(sql, id, (err, results) => {
                    if(err){
                        res.status(500).send('Fallo al encontrar resultados para "Tiendas de interes"');
                    } else {
                        res.status(200).send(results);
                    }
                })
            } catch(error){
                console.log(error);
                res.status(500).send('Error interno')
            }
        },
    
        getInterestbyStore: (req,res) => {
            try{
                const { id } = req.params
                const sql = 'SELECT * FROM interesados WHERE id_tienda = ?'
    
                connection.query(sql, id, (err, results) => {
                    if(err){
                        res.status(500).send('Fallo al encontrar resultados para "Tiendas de interes"');
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

export default InterestController