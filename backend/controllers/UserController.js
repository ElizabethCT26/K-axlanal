import connection from "../db/dbConfig.js";

const Usercontroller = {

    getProfile: (req, res) => {
        const { id }= req.params
        try{
            const sql = 'SELECT * FROM view_profile WHERE id = ?';

            connection.query(sql,[id], (err, results) => {
                if(err){
                    res.status(500).send('Fallo al recuperar perfil de usuario');
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

    getProfiles: (req, res) => {
        const { id }= req.params
        try{
            const sql = 'SELECT * FROM users';

            connection.query(sql,[id], (err, results) => {
                if(err){
                    res.status(500).send('Fallo al recuperar perfil de usuario');
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
    deleteProfiles: (req,res) => {
        try{
            const {id} = req.params;
            const sql = 'DELETE FROM users WHERE id = ?';
            const sqlStore = 'Update tiendas set id_propietario = null where id_propietario = ?'

            connection.query(sqlStore, id, (err, results) => {
                if(err){
                    console.log(err)
                    res.status(500).send('Fallo al eliminar al usuario');
                } else {
                    res.status(200).send('Usuario eliminado correctamente');
                }
            });
        } catch (error){
            console.log(error);
            res.status(500).send('Error interno');
        }
    }


}

export default Usercontroller