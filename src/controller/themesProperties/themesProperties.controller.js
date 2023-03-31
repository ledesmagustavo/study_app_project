const { sequelize } = require("../../connection");
const { ThemesPropertiesModel } = require("../../model/themesProperties.model");
const ThemesPropertiesService = require('../../Service/themesProperties.service');
const listar = async function (req, res) {
    console.log("listar thmes prioperties controller");

    try {
       // 
       const themes_properties = await ThemesPropertiesService.listar(req.query.filtro || '');

        if (themes_properties) {
            // En users[0] se encuentra el listado de lo que se recupera desde el SQL
            res.json({
                success: true,
                propiedadesTemas: themes_properties
            });
        } else {
            res.json({
                success: true,
               propiedadesTemas: []
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });
    }
};

const consultarPorCodigo = async function (req, res) {
    console.log("consultar propiedades de temas");

    try {
        // Buscar en la base de datos por codigo
        const themesPropertiesModelResult = await ThemesPropertiesService.consultarPorCodigo(req.query.filtro || '');

        if (themesPropertiesModelResult) {
            res.json({
                success: true,
                propiedadesTemas: themesPropertiesModelResult
            });
        } else {
            res.json({
                success: true,
                propiedadesTemas: null
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });
    }
};

const actualizar = async function (req, res) {
    console.log("actualizar propiedades de temas");


    // res.send("actualiza los usuarios")
    // variables
    let usuarioRetorno = null; // guarda el usuario que se va incluir o editar
    //const data = req.body; // se optiene los datos del cuerpo de la peticion 
   // const id = req.body.id;

    try {
        
    usuarioRetorno = await ThemesPropertiesService.actualizar(
        req.body.id, 
        req.body.property_name, 
        req.body.property_value);

        res.json({
            success:true,
            user: usuarioRetorno
        })

    } catch (error) {
        console.log(error);

         res.json({
        success: false,
        error: error.message
    });
};
}


const eliminar = async function (req, res) {
    console.log("eliminar propiedades de temas");

    // borrado fisico
   //  UserModel.destroy(req.params.id);
    try {

        await sequelize.query("UPDATE themes_properties SET deleted = true WHERE id=  " + req.params.id);
        res.json({
            success: true
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error : error.message
        });
    }
};


module.exports = {
    listar, busquedaPorCodigo: consultarPorCodigo, actualizar, eliminar
};