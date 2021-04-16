const { BrowserWindow, Notification, ipcMain, app, webContents, ipcRenderer, } = require('electron');
const { devTools } = require('electron-debug');
const { get } = require('http');
const path = require('path');
const { getconexion } = require('./database')
    //Creacion de la ventana que se estara utilizando
let win;
let winHome;
var prueba;
var id_Escue;

ipcMain.on('envio', (event, id) => {
    prueba = id;
    idEscu();
})

function createWindow() {
    win = new BrowserWindow({
        width: 1366,
        height: 768,
        webPreferences: {
            resizable: false,
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        }
    })
    win.loadFile('src/renderer/index.html')
}

function createWindowHome() {
    winHome = new BrowserWindow({
        width: 1336,
        height: 768,
        resizable: false,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            contextIsolation: false,
        }
    })
    winHome.loadFile('src/renderer/Home.html')

}
ipcMain.handle('get', (event) => {
    getProducts()

})

ipcMain.handle('login', (event, obj) => {
    validarlogin(obj);
    obtener();
})

function obtener() {
    win.webContents.send('ping', 'whoooooooh!')
}

async function validarlogin(obj) {
    const conn = await getconexion();
    const pass = { usu, con } = obj;
    const sql = "SELECT Usuario_Administrativo.Id_Administrativo, Usuario_Administrativo.Contraseña , Administrativos.Nombre FROM Usuario_Administrativo INNER JOIN Administrativos ON Usuario_Administrativo.Id_Administrativo = ? AND Usuario_Administrativo.Contraseña=?"
    await conn.query(sql, [usu, con], (error, results, fields) => {
        if (error) { console.log(error); }
        if (results.length > 0) {
            createWindowHome();
            winHome.show()
        } else {
            new Notification({
                title: "login",
                body: 'El usuario o contraseña son invalidos'
            }).show()
        }
    })
}


async function getProducts() {
    const con = await getconexion();
    const sql = 'SELECT Solicitud.Id_Solicitud, Solicitud.Fecha, Solicitud.Estatus, Estudiantes.Matricula, Curso.Grado, Escuelas.Nombre FROM Solicitud INNER JOIN Curso ON Solicitud.Id_Curso = Curso.ID_Curso INNER JOIN Estudiantes ON Estudiantes.Id_Estudiantes = Solicitud.Id_Estudiantes INNER JOIN Escuelas ON Solicitud.Id_Escuelas = Escuelas.Id_Escuelas WHERE Solicitud.Id_Escuelas = ?'
    await con.query(sql, [id_Escue], (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        winHome.webContents.send('products', results)
    })
}

async function idEscu() {
    const con = await getconexion();
    const sql = 'SELECT * FROM `Administrativos` WHERE Id_Administrativo = ?'
    await con.query(sql, [prueba], (error, results, fields) => {
        if (error) {
            console.log(error)
        } 
        id_Escue = results[0].Id_Escuela
    console.log(id_Escue);       
    })

}

module.exports = {
    createWindow
}