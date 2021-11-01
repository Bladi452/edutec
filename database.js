const mysql = require('promise-mysql');

const conexion = mysql.createConnection({
    host:'localhost',
    user: 'tecnodi1_conforpasrl',
    password: 'Df(I-i_iP1))',
    database: 'tecnodi1_conforpra'
})

function getconexion(){
    return conexion;
}

module.exports ={getconexion}

