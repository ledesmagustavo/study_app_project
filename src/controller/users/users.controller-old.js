
/* const { where } = require("sequelize/types");
const { SELECT } = require("sequelize/types/query-types"); */
const {sequelize} = require("../../connection");


const listar = async function(req, res){
    
    console.log("listar usuarios");

  try{
    const users = await sequelize.query("SELECT * FROM users WHERE deleted is false");

    if (users && users[0]){
        // en users[0] se encuentra el listado de lo que se recupera desde el sql
        res.json({
            success : true,
            usuarios : users[0]
        });

    }else{
        res.json({
            success : true,
            usuarios : []
        });

  }
}catch (error){
    console.log(error);
    res.json({
        success : false,
        error : error.message
    });

 }

};

const consultarPorCodigo = async function(req, res){
    
    console.log("Consulta por codigo");

  try{
    const users = await sequelize.query(`SELECT * FROM users WHERE id = ${req.params.id} AND deleted is false`);

    if (users && users[0] && users[0][0]){
        // en users[0] se encuentra el listado de lo que se recupera desde el sql
        res.json({
            success : true,
            usuario : users[0][0]
        });

    }else{
        res.json({
            success : true,
            usuario :null   
        });

  }
}catch (error){
    console.log(error);
    res.json({
        success : false,
        error : error.message
    });

 }

};


const actualizar = async function(req, res){
    
    console.log("actualizar usuarios");
    //res.send("actualizar de usuarios");
    //variables
    try{
    let usuarioRetorno = null; //guarda el usuario que se va incluir o editar;
    const data = req.body; //se obtiene los datos del cuerpo de la peticion
    const id = req.body.id;
    
    let usrExiste = null;
    if (id){
        usrExiste = await sequelize.query("SELECT * FROM users WHERE id = " + id);//buscar usuarios por id pasado
    }

    if (usrExiste && usrExiste[0] && usrExiste[0][0] && usrExiste[0][0].id){
        //asegurar que el usuario existe, entonces actualizar
        const retornoUpdate = await sequelize.query (`UPDATE users SET
                                                name = '${data.name}',                     
                                                last_name = '${data.last_name}',
                                                avatar = '${data.avatar}',
                                                email = '${data.email}',
                                                password = '${data.password}',
                                                deleted = ${data.deleted}
                                                WHERE id = ${id}`);
    usuarioRetorno = await sequelize.query("SELECT * FROM users WHERE id = " + usrExiste[0][0].id);
    usuarioRetorno = usuarioRetorno[0][0];
    }else{
    //incluir
    const retornoInsert = await sequelize.query(`INSERT INTO users (name, last_name, avatar, email, password, deleted) VALUES('${data.name}', '${data.last_name}', '${data.avatar}', '${data.email}', '${data.password}', false)
                          RETURNING id;`);

    usuarioRetorno = await sequelize.query("SELECT * FROM users WHERE id = " + retornoInsert[0][0].id);
    usuarioRetorno = usuarioRetorno[0][0];
}
res.json({
    success : true,
    user : usuarioRetorno
});
}catch(error){

    res.json({
        success : false,
        error :  error.message
    });
}
}




const eliminar = async function(req, res) {

    console.log("eliminar usuarios");
    //res.send("eliminar de usuarios");
    try {  
    await sequelize.query("UPDATE users SET deleted=true WHERE id = " + req.params.id);
    res.json({
        success: true
    });

}catch(error){

    res.json({
        success : false,
        error :  error.message
    });


}
}

module.exports = {listar, consultarPorCodigo, actualizar, eliminar};



/*module.exports = function(req, res){

    console.log("controller de usuarios");
    res.send("listado de usuarios");
};*/