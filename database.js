const mysql = require('promise-mysql');

const conexion = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'edutec'
})

function getconexion(){
    return conexion;
}

module.exports ={getconexion}

