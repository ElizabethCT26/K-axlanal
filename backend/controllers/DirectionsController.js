import connection from '../db/dbConfig.js'

const DirectionsController = {

    getDirections:(req,res) => {
        try{
            const sql = 'SELECT * FROM view_directions';

            connection.query(sql,(err,results) => {
                if(err){
                    res.status(500).send('Fallo al recuperar las direcciones');
                }else{
                    if(results == 0){
                        res.status(404).send('No se ha encontrado nada - Error 404');
                    }
                    else{
                        res.status(200).send(results);
                    }
                }
            })

        }catch(error){
            console.log(error);
            res.status(500).send('Error interno')

        }
    },

    getDirection:(req,res) => {
        const { id } = req.params;
        try{
            const sql = 'SELECT * FROM view_directions WHERE id_tienda = ?';

            connection.query(sql, id,(err,results) => {
                if(err){
                    res.status(500).send('Fallo al recuperar la direccion');
                }else{
                    if(results == 0){
                        res.status(404).send('No se ha encontrado nada - Error 404');
                    }
                    else{
                        res.status(200).send(results);
                    }
                }
            })

        } catch(error){
            console.log(error);
            res.status(500).send('Error interno')

        }
    } 


}

export default DirectionsController