const { sequelize } = require("../../connection");

require("../../connection");

const listar = async function(req, res){
    console.log("Listar temas");

    try{
        const themes = await sequelize.query("SELECT * FROM themes");

        if( themes && themes[0]){
            res.json({
                success : true,
                themes : themes[0]
            });
        } else{
            res.json({
                success : true,
                themes : []
            });
        }
    } catch(error){
        console.log(error);
        res.json({
            success : false,
            error : error.message
        });
    }
};

const consultarPorCodigo = async function(req, res) {
    console.log("consultar por codigo");

    try {
        const themes = await sequelize.query( `SELECT * FROM themes WHERE 1=1 AND id = ${req.params.id}`)
        /*
        users -[1,2]
        registros, metadata
        users = [[{id:1, name:'jose'}, {...}], {}]
        */
       if (themes && themes[0] && themes[0][0]){

        res.json({
            success : true,
            themes : thmes[0][0]
        });
       } else {
        console.log(error);
        res.json({
            success : true,
            themes : null
        });
       }
        
    } catch (error) {
        console.log(error);
        res.json({
            succes : false,
            error : error.message
        });
        
    }
};

const actualizar =  async function(req, res){
    console.log("Actualizar temas");

    try{ // ANHADO EL TRY CATCH

        let themeRetorno = null;
        const data = req.body;
        const id = req.body.id;

        let themeExiste = null;
        if(id){
            themeExiste = await sequelize.query("SELECT * FROM themes WHERE id=" + id);
        }
        if(themeExiste && themeExiste[0] && themeExiste[0][0] && themeExiste[0][0].id){
            const retornoUpdate = await sequelize.query(`UPDATE themes SET
                                                        create_date = '${data.create_date}',
                                                        topic_id = '${data.topic_id}',
                                                        name = '${data.name}',
                                                        description = '${data.description}',
                                                        keywords = '${data.keywords}',
                                                        avatar = '${data.avatar}'
                                                        owner_user_id = '${data.owner_user_id}'

                                                        WHERE id = ${id}`);
        themeRetorno = await sequelize.query("SELECT * FROM themes WHERE id= " + themeExiste[0][0].id);
        themeRetorno = themeRetorno[0][0];
                                                                                                                                                                                                                                            
        } else {
            const retornoInsert = await sequelize.query(`INSERT INTO themes (create_date, topic_id, name, description, keywords, avatar, owner_user_id) VALUES (
                '${data.create_date}', '${data.topic_id}', '${data.name}', '${data.description}', '${data.keywords}', '${data.avatar}', '${data.owner_user_id}' false )
                RETURNING id;`);
                themeRetorno = await sequelize.query("SELECT * FROM themes WHERE id= " + retornoInsert[0][0].id);
                themeRetorno = usuarioRetorno[0][0];
                res.json({
                    success : true,
                    themes : themeRetorno
                });
            
        }
    } catch (error){
        console.log(error)
        res.json({
            success : false,
            error : error.message
        });
    }
};

const eliminar = async function(req, res){
    console.log("Eliminar themes");

try{

    await sequelize.query("UPDATE themes SET deleted = true WHERE id=  "+req.params.id);
    res.json({
        success: true
    });
} catch(error){
 res.json({
    success : false,
    themes : themeRetorno
 });
}


};

module.exports ={
    listar, busquedaPorCodigo: consultarPorCodigo, actualizar, eliminar
};

