const{sequelize} = require("../connection");
const {UserModel} = require("../model/user.model");

const listar = async function(textoBuscar){

    console.log("Listar temas");

    try {
        const themes = await sequelize.query(`SELECT * 
        FROM themes
        WHERE 1=1
       AND UPPER(name) LIKE UPPER ('%${textoBuscar}%')
        AND deleted IS false
        ORDER BY id`);

        if(themes && themes[0]){

            return themes[0];

        } else{
            return[];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const consultarPorCodigo = async function (req, res) {
    console.log("consultar temas por codigo");

    try {
        // Buscar en la base de datos por codigo
        const themesModelResult = await themeModel.findByPk(req.params.id);

        if (themesModelResult) {
           return themesModelResult
            }
     else {
            return null;
            }
        }
    catch (error) {
        console.log(error);
        throw error;
        }
};

const actualizar = async function (create_date, name, descripcion, keywords, owner_user_id, deleted) {
    console.log("actualizar temas");


    // res.send("actualiza los usuarios")
    // variables
    let usuarioRetorno = null; // guarda el usuario que se va incluir o editar
   const data = {create_date, name, descripcion, keywords, owner_user_id, deleted};
   // const id = req.body.id;

    try {
        
    let themeExiste = null;
    if (id) {
        themeExiste = await ThemeModel.findByPk(id);

    }
    if (themeExiste) {
        // asegurar que el usuario existe, entonces actualizar
        usuarioRetorno = await ThemeModel.update(data, { where : {id:id}});
        usuarioRetorno = data;

    } else { // incluir
        themeRetorno = await ThemeModel.create(data);

    }
    return themeRetorno;

    } catch (error) {
        console.log(error);
        throw error;
};
}


const eliminar = async function (id) {
    console.log("eliminar temas");

    // borrado fisico
   //  UserModel.destroy(req.params.id);
    try {

        await sequelize.query("UPDATE themes SET deleted = true WHERE id=  " + id);
       return;
    
    } catch (error) {
        console.log(error);
        throw error;
        }
};


module.exports = {
    listar, busquedaPorCodigo: consultarPorCodigo, actualizar, eliminar
};