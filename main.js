const { BrowserWindow, Notification, ipcMain, app, ipcRenderer, } = require('electron');
const path = require('path');
const { getconexion } = require('./database')
    //Creacion de la ventana que se estara utilizando
let win;
let winHome;


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
    id = { usu } = obj
})


async function validarlogin(obj) {
    const conn = await getconexion();
    const pass = { usu, con } = obj;
    const sql = "SELECT Usuario_Administrativo.Id_Administrativo, Usuario_Administrativo.Contraseña , Administrativos.Nombre FROM Usuario_Administrativo INNER JOIN Administrativos ON Usuario_Administrativo.Id_Administrativo = ? AND Usuario_Administrativo.Contraseña=?"
    await conn.query(sql, [usu, con], (error, results, fields) => {
        if (error) { console.log(error); }
        if (results.length > 0) {
            createWindowHome();
            winHome.show()
            win.hide()
        } else {
            new Notification({
                title: "login",
                body: 'El usuario o contraseña son invalidos'
            }).show()
        }
    })
}

async function InsertEstu() {


}

async function getProducts(id) {
    const con = await getconexion();
    const sql = 'SELECT Solicitud.Id_Solicitud, Solicitud.Fecha, Solicitud.Estatus, Curso.Grado, Estudiantes.Nombre FROM Solicitud INNER JOIN Curso ON Solicitud.Id_Curso = Curso.ID_Curso JOIN Estudiantes ON Solicitud.Id_Escuelas = Solicitud.Id_Solicitud'
    await con.query(sql, (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        winHome.webContents.send('products', results)
    })
}

module.exports = {
    createWindow,
}
module.exports = {
    createWindow,
}