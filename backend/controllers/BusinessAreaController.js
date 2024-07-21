import connection from "../db/dbConfig.js";

const BusinessAreaController = {

    getAreas: (req, res) => {
        const { id }= req.params
        try{
            const sql = 'SELECT * FROM area_comercial';

            connection.query(sql,[id], (err, results) => {
                if(err){
                    res.status(500).send('Fallo al recuperar areas comerciales');
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

}

export default BusinessAreaController