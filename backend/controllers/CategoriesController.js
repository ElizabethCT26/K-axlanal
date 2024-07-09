import connection from '../db/dbConfig.js'

const CategoriesController = {

    createCategorie:(req,res) => {
        try{
            const {nombre, descripcion} = req.body;
            const sql = 'INSERT INTO categorias(nombre, descripcion) VALUES (?, ?)';
            if(!nombre || !descripcion){
               return res.status(400).send('Los datos requeridos no se han enviado o no se encuentran en el formato apropiado');
            }

            connection.query(sql,[nombre,descripcion], (err,results) =>{
                if(err){
                    res.status(500),send('Fallo al agregar la categoría');
                }else{
                    res.status(200).send('Categoría agregada correctamente')
                }
            })
        }
        catch(error){
            console.log(error);
            res.status(500).send('Error interno')

        }
    },
    getCategories:(req,res) => {
        try{
            const sql = 'SELECT * FROM categorias';

            connection.query(sql,(err,results) => {
                if(err){
                    res.status(500).send('Fallo al recuperar las categorias');
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
    getCategorie:(req,res) => {
        try{
            const { id } = req.params;

            const sql ='SELECT * FROM categorias WHERE id = ?';

            connection.query(sql,id, (err,results) => {
                if(err){
                    res.status(500).send('Fallo al recuperar la categoria');

                }else{
                    if(results == 0){
                        res.status(400).send('No se ha encontrado nada - Error 404');
                    }else{
                        res.status(200).send(results);
                    }
                }
            })
        }catch(error){
            console.log(error);
            res.status(500).send('Error interno')

        }
    },
    updateCategorie:(req,res) =>{
        try{
            const { id } = req.params;
            const { nombre, descripcion } = req.body;
            const sql = 'UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?';

            connection.query(sql,[nombre, descripcion, id], (err,results) => {
                console.log(results)
                if(err){
                    res.status(500).send('Fallo al actualizar la categoria');
                }else{
                    if(results.affectedRows != 0){
                        res.status(200).send('Categoria actualizada correctamente');
                    } else {
                        res.status(404).send('No se ha encontrado la categoria a actualizar')
                    }
                }
            })

        }catch(error){
            console.log(error);
            res.status(500).send('Error interno')

        }
    },
    deleteCategorie:(req,res) => {
        try{
            const {id} = req.params
            const sql = 'DELETE FROM categorias WHERE id = ?';

            connection.query(sql,id, (err,results) => {
                if(err){
                    res.status(500).send('Fallo al eliminar la categoria');
                }else{
                    if(results.affectedRows != 0){
                        res.status(200).send('Producto eliminado correctamente');
                    } else {
                        res.status(404).send('No se ha encontrado el producto a elinminar')
                    }
                }
            })
        }catch(error){
            console.log(error);
            res.status(500).send('Error interno')
        }
    }
    
}

export default CategoriesController