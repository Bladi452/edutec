const mysql = require('promise-mysql');

const conexion = mysql.createConnection({
    host: "198.38.88.146",
    user: "tecnodi1_TecnoDiaz",
    password: 'tecnodiazoficial4523',
    database: "tecnodi1_Eduatlas-new"
})

function getconexion(){
    return conexion;
}

module.exports ={getconexion}

