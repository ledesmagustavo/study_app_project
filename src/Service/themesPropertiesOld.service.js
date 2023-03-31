const{sequelize} = require("../connection");
const {ThemesPropertiesModel} = require("../model/themesProperties.model");

const listar = async function(textoBuscar){

    console.log("Listar propiedades de temas");

    try {
        const themes_properties = await sequelize.query(`SELECT * 
        FROM themes_properties
        WHERE 1=1
       AND UPPER(name) LIKE UPPER ('%${textoBuscar}%')
        AND deleted IS false
        ORDER BY id`);

        if(themes_properties && themes_properties[0]){

            return themes_properties[0];

        } else{
            return[];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const consultarPorCodigo = async function (req, res) {
    console.log("consultar propiedades de temas por codigo");

    try {
        // Buscar en la base de datos por codigo
        const ThemesPropertiesModelResult = await ThemesPropertiesModel.findByPk(req.params.id);

        if (ThemesPropertiesModelResult) {
           return ThemesPropertiesModelResult
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

const actualizar = async function (property_name, property_value) {
    console.log("actualizar propiedades de temas");


    // res.send("actualiza los usuarios")
    // variables
    let usuarioRetorno = null; // guarda el usuario que se va incluir o editar
   const data = {property_name, property_value};
   // const id = req.body.id;

    try {
        
    let ThemesPropertiesExiste = null;
    if (id) {
        ThemesPropertiesExiste = await ThemesPropertiesModel.findByPk(id);

    }
    if (ThemesPropertiesExiste) {
        // asegurar que el usuario existe, entonces actualizar
        usuarioRetorno = await ThemesPropertiesModel.update(data, { where : {id:id}});
        usuarioRetorno = data;

    } else { // incluir
        ThemePropertiesRetorno = await ThemesPropertiesModel.create(data);

    }
    return ThemePropertiesRetorno;

    } catch (error) {
        console.log(error);
        throw error;
};
}


const eliminar = async function (id) {
    console.log("eliminar propiedades de temas");

    // borrado fisico
   //  UserModel.destroy(req.params.id);
    try {

        await sequelize.query("UPDATE themes_properties SET deleted = true WHERE id=  " + id);
       return;
    
    } catch (error) {
        console.log(error);
        throw error;
        }
};


module.exports = {
    listar, busquedaPorCodigo: consultarPorCodigo, actualizar, eliminar
};