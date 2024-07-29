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
    } ,

    postDirection:(req,res) => {
        const id_propietario = req.userId;
        const { latitude,longitude,id_tienda } =req.body
        let { avenida ,calle ,codigo_postal,  } = req.body

        avenida = avenida || null;
        calle = calle || null;
        codigo_postal = codigo_postal || null;

        try{
            const sql = 'INSERT INTO direccion (avenida, calle, codigo_postal, latitude, longitude,id_tienda) VALUES ( ?, ?, ?, ?, ?, ?)';
            connection.query(sql, [avenida ,calle ,codigo_postal, latitude,longitude,id_tienda],(err,results) => {
                if(err){
                    console.error(err)
                    res.status(500).send('Fallo al recuperar la direccion');
                }else{
                    res.status(200).send('agregado correctamente')
                }
            })

        } catch(error){
            console.log(error);
            res.status(500).send('Error interno')
        }
    }   


}

export default DirectionsController