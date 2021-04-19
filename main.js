//Llamar modulos de electron

const { BrowserWindow, Notification, ipcMain } = require('electron');

//Se llama la conexion a la base de datos y se iguala a una constante

const { getconexion } = require('./database')

//Se nombran las variables que se estran usando durante el proyecto 
let win;
let winHome;

//Se utiliza para tomar el campo Id que proviene desde el login.js e igualarlo a una variable global
var Id_Admin;

//Lo utilizamos para igualar el campo de la base de datos Id_Escuela que esta relacionado con el administrativo que inicio sesion
var id_Escue;

//Recibe el Id de quien ingreso
ipcMain.on('envio', (event, id) => {
    Id_Admin = id;
})
//Creamos la ventana del login

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
    win.loadFile('src/renderer/Login.html')
}

//Creamos la ventana del Home


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

//Se utiliza para enviar los datos de la funcion getSolicitud al Home
ipcMain.handle('get', (event) => {
    GetSolicitud()
})

ipcMain.handle('getAceptar', (event) => {
    GetSolicitudAcep()
})

ipcMain.handle('getAceptar', (event) => {
    GetSolicitudDene()
})

ipcMain.handle("Denegar_canal",( event,obj ) => {
    Denegar_Solicitud(obj)
});

//Lo utilizamos para llamar la funcion que valida el login y pasarle los datos ingresados a validar
ipcMain.handle('login', (event, obj) => {
    validarlogin(obj);
})

ipcMain.handle("Aceptar_Canal", (event ,obj)=>{
    Aceptar_Solicitud(obj)
})

//Iniciamos la funcion pasandole el objeto que contiene los datos a validar
async function validarlogin(obj) {
    //Llamamos la conexion a base de datos y la encapsulamos a una constante
    const conn = await getconexion();
    //Separamos los datos de usuario y contraseña del array obj que era la variable que los contenia
    const pass = { usu, con } = obj;
    //Igualamos el Query de base de datos a una variable
    const sql = "SELECT Usuario_Administrativo.Id_Administrativo, Usuario_Administrativo.Contraseña , Administrativos.Nombre FROM Usuario_Administrativo INNER JOIN Administrativos ON Usuario_Administrativo.Id_Administrativo = ? AND Usuario_Administrativo.Contraseña=?"
    //Abrimos la conexion, pasamos el Query y validamos el usuario
    await conn.query(sql, [usu, con], (error, results, fields) => {
        if (error) { console.log(error); }
        //Si el usuario es correto abrimos el Home de lo contrario lanzamos una notificacion
        if (results.length > 0) {
            idEscu();
            createWindowHome();
            winHome.show()
            win.hide()
        } else {
            new Notification({
                title: "EduAtlas",
                body: 'El usuario o contraseña no son validos'
            }).show()
        }
    })
} 

//Esta funcion pasa los datos de las solicitudes a cada escuela
async function GetSolicitud() {
    const con = await getconexion();
    const sql = 'SELECT Solicitud.Id_Solicitud, Solicitud.Fecha, Solicitud.Estatus, Estudiantes.Matricula, Curso.Grado, Escuelas.Nombre FROM Solicitud INNER JOIN Curso ON Solicitud.Id_Curso = Curso.ID_Curso INNER JOIN Estudiantes ON Estudiantes.Id_Estudiantes = Solicitud.Id_Estudiantes INNER JOIN Escuelas ON Solicitud.Id_Escuelas = Escuelas.Id_Escuelas WHERE Solicitud.Id_Escuelas = ? AND Solicitud.Estatus = "Vacio"'
    await con.query(sql, [id_Escue], (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        winHome.webContents.send('solicitudes', results)
    })
}

async function GetSolicitudAcep(){
    const con = await getconexion();
    const sql = 'SELECT Solicitud.Id_Solicitud, Solicitud.Fecha, Solicitud.Estatus, Estudiantes.Matricula, Curso.Grado, Escuelas.Nombre FROM Solicitud INNER JOIN Curso ON Solicitud.Id_Curso = Curso.ID_Curso INNER JOIN Estudiantes ON Estudiantes.Id_Estudiantes = Solicitud.Id_Estudiantes INNER JOIN Escuelas ON Solicitud.Id_Escuelas = Escuelas.Id_Escuelas WHERE Solicitud.Id_Escuelas = ? AND Solicitud.Estatus = "Aceptado"'
    await con.query(sql, [id_Escue], (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        winHome.webContents.send('solicitudesNew', results)
    })
}

async function GetSolicitudDene(){
    const con = await getconexion();
    const sql = 'SELECT Solicitud.Id_Solicitud, Solicitud.Fecha, Solicitud.Estatus, Estudiantes.Matricula, Curso.Grado, Escuelas.Nombre FROM Solicitud INNER JOIN Curso ON Solicitud.Id_Curso = Curso.ID_Curso INNER JOIN Estudiantes ON Estudiantes.Id_Estudiantes = Solicitud.Id_Estudiantes INNER JOIN Escuelas ON Solicitud.Id_Escuelas = Escuelas.Id_Escuelas WHERE Solicitud.Id_Escuelas = ? AND Solicitud.Estatus = "Denegado"'
    await con.query(sql, [id_Escue], (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        winHome.webContents.send('solicitudesDene', results)
    })
}

async function Denegar_Solicitud(obj){
const con = await getconexion();
const pass = {Id_Solicitud} = obj
const sql = 'UPDATE Solicitud SET Estatus = "Denegado" WHERE Solicitud.Id_Solicitud=?'
con.query(sql, [obj], (error, results, fields)=>{
    if(error){
        console.log(error)
    }
    GetSolicitud()
});
}

async function Aceptar_Solicitud (obj){
const con = await getconexion();
const sql = 'UPDATE Solicitud SET Estatus = "Aceptado" WHERE Solicitud.Id_Solicitud=?'
con.query(sql, [obj], (error, results, fields) =>{
if(error){
    console.log(error)
}
GetSolicitud()
})
}

//Definimos la relacion entre el administrativo que inicio sesion y la escuela a la que pertenece
async function idEscu() {
    const con = await getconexion();
    const sql = 'SELECT * FROM `Administrativos` WHERE Id_Administrativo = ?'
    await con.query(sql, [Id_Admin], (error, results, fields) => {
        if (error) {
            console.log(error)
        }
        //igualo el lugar 0 del array donde se encuentra el id de la escuela a una variable global
        id_Escue = results[0].Id_Escuela
    })

}
//Exportamos la funcion que crea la primera ventana al index 
module.exports = {
    createWindow
}