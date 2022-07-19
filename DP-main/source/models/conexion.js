const mysql = require("mysql");
const { promisify } = require('util');

var sqlConnecion = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"dp1" 
});

sqlConnecion.connect(function(err){
    if(err){
        console.log(err.message);
    }
    else{
        console.log("Se conecto con exito");
    }

});

sqlConnecion.query = promisify(sqlConnecion.query)

module.exports = sqlConnecion;
