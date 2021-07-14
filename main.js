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

ipcMain.handle('getDocs', (event) => {
    GetDocs()
})

ipcMain.handle('AgreEvent2', (event, obj) => {
    obj1 = { Nombre, Descripcion, Fecha_Ini, Fecha_Fin } = obj;
    obj2 = { Nombre, Descripcion, Fecha_Ini, Fecha_Fin, Codigo_Escuelas: id_Escue }
    AgregarEvent(obj2)
})
ipcMain.handle('eventos', (event, obj) => {
    GetEventos(obj)
})

ipcMain.handle('getAceptar', (event) => {
    GetSolicitudAcep()
})

ipcMain.handle('getDene', (event) => {
    GetSolicitudDene()
})

ipcMain.handle("Denegar_canal", (event, obj) => {
    Denegar_Solicitud(obj)
});

ipcMain.handle("Denegar_documentos", (event, obj) => {
    Denegar_documentos(obj)
});

ipcMain.handle("Aceptar_documentos", (event, obj) => {
    Aceptar_documentos(obj)
});

//Lo utilizamos para llamar la funcion que valida el login y pasarle los datos ingresados a validar
ipcMain.handle('login', (event, obj) => {
    validarlogin(obj);
})

ipcMain.handle("Aceptar_Canal", (event, obj) => {
    Aceptar_Solicitud(obj)
})

//Iniciamos la funcion pasandole el objeto que contiene los datos a validar
async function validarlogin(obj) {
    //Llamamos la conexion a base de datos y la encapsulamos a una constante
    const conn = await getconexion();
    //Separamos los datos de usuario y contraseña del array obj que era la variable que los contenia
    const pass = { usu, con } = obj;
    //Igualamos el Query de base de datos a una variable
    const sql = "SELECT usuario_administrativo.Id_Administrativo, usuario_administrativo.Contraseña , administrativos.Nombre FROM usuario_administrativo INNER JOIN administrativos ON usuario_administrativo.Id_Administrativo = ? AND usuario_administrativo.Contraseña=?"
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

async function GetDocs() {
    const con = await getconexion();
    const sql = 'SELECT documentos.Id_documentos, documentos.UrlDocs, documentos.Id_Estudiantes, documentos.Nombre, estudiantes.Matricula FROM documentos INNER JOIN estudiantes ON documentos.Id_Estudiantes = estudiantes.Id_Estudiantes WHERE documentos.Codigo_Escuelas = ? AND documentos.Estado = "Vacio"';
    await con.query(sql, [id_Escue], (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        winHome.webContents.send('Docs', results)
    })
}

//Esta funcion pasa los datos de las solicitudes a cada escuela
async function GetSolicitud() {
    const con = await getconexion();
    const sql = 'SELECT solicitud.Id_Solicitud, solicitud.Fecha, solicitud.Estatus, estudiantes.Matricula, curso.Grado, escuelas.Nombre FROM solicitud INNER JOIN curso ON solicitud.Id_Curso = curso.ID_Curso INNER JOIN estudiantes ON estudiantes.Id_Estudiantes = solicitud.Id_Estudiantes INNER JOIN escuelas ON solicitud.Codigo_Escuelas = escuelas.Codigo_Escuelas WHERE solicitud.Codigo_Escuelas = ? AND solicitud.Estatus = "Vacio"';
    await con.query(sql, [id_Escue], (error, results, fields) => {
        if (error) {
            console.log();
        }
        winHome.webContents.send('solicitudes', results)
    })
}

async function GetEventos() {
    const con = await getconexion();
    const sql = 'SELECT eventos.Id_Eventos, eventos.Nombre, eventos.Fecha_Ini, eventos.Fecha_Fin, eventos.Descripcion FROM `eventos` WHERE eventos.Codigo_Escuelas = ? '
    await con.query(sql, [id_Escue], (error, results, fields) => {
        if (error) {
            console.log(error)
        }
        winHome.webContents.send('eventos', results)
    })
}

async function GetSolicitudAcep() {
    const con = await getconexion();
    const sql = 'SELECT solicitud.Id_Solicitud, solicitud.Fecha, solicitud.Estatus, estudiantes.Matricula, curso.Grado, escuelas.Nombre FROM solicitud INNER JOIN curso ON solicitud.Id_Curso = curso.ID_Curso INNER JOIN estudiantes ON estudiantes.Id_Estudiantes = solicitud.Id_Estudiantes INNER JOIN escuelas ON solicitud.Codigo_Escuelas = escuelas.Codigo_Escuelas WHERE solicitud.Codigo_Escuelas = ? AND solicitud.Estatus = "Aceptado"'
    await con.query(sql, [id_Escue], (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        winHome.webContents.send('solicitudesNew', results)
    })
}

async function GetSolicitudDene() {
    const con = await getconexion();
    const sql = 'SELECT solicitud.Id_Solicitud, solicitud.Fecha, solicitud.Estatus, estudiantes.Matricula, curso.Grado, escuelas.Nombre FROM solicitud INNER JOIN curso ON solicitud.Id_Curso = curso.ID_Curso INNER JOIN estudiantes ON estudiantes.Id_Estudiantes = solicitud.Id_Estudiantes INNER JOIN escuelas ON solicitud.Codigo_Escuelas = escuelas.Codigo_Escuelas WHERE solicitud.Codigo_Escuelas = ? AND solicitud.Estatus = "Denegado"'
    await con.query(sql, [id_Escue], (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        winHome.webContents.send('solicitudesDene', results)
    })
}

async function AgregarEvent(obj2) {
    const con = await getconexion();
    const sql = 'INSERT INTO eventos SET ?'
    con.query(sql, [obj2], (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        GetEventos();
    })
}

async function Denegar_Solicitud(obj) {
    const con = await getconexion();
    const pass = { Id_Solicitud } = obj
    const sql = 'UPDATE solicitud SET Estatus = "Denegado" WHERE solicitud.Id_Solicitud=?'
    con.query(sql, [obj], (error, results, fields) => {
        if (error) {
            console.log(error)
        }
        GetSolicitud()
        GetSolicitudDene()
        GetSolicitudAcep()
    });
}

async function Denegar_documentos(obj) {
    const con = await getconexion();
    const pass = { Id_Solicitud } = obj
    const sql = 'UPDATE documentos SET Estado= "Denegado" WHERE documentos.Id_documentos=?'
    con.query(sql, [obj], (error, results, fields) => {
        if (error) {
            console.log(error)
        }
        GetDocs();
    });
}

async function Aceptar_documentos(obj) {
    const con = await getconexion();
    const sql = 'UPDATE documentos SET Estado = "Aceptado" WHERE documentos.Id_documentos=?'
    con.query(sql, [obj], (error, results, fields) => {
        if (error) {
            console.log(error)
        }
        GetDocs();
    })
}


async function Aceptar_Solicitud(obj) {
    const con = await getconexion();
    const sql = 'UPDATE solicitud SET Estatus = "Aceptado" WHERE solicitud.Id_Solicitud=?'
    con.query(sql, [obj], (error, results, fields) => {
        if (error) {
            console.log(error)
        }
        GetSolicitud()
        GetSolicitudDene()
        GetSolicitudAcep()
    })
}

//Definimos la relacion entre el administrativo que inicio sesion y la escuela a la que pertenece
async function idEscu() {
    const con = await getconexion();
    const sql = 'SELECT * FROM `administrativos` WHERE Id_Administrativo = ?'
    await con.query(sql, [Id_Admin], (error, results, fields) => {
        if (error) {
            console.log(error)
        }
        //igualo el lugar 0 del array donde se encuentra el id de la escuela a una variable global
        id_Escue = results[0].Codigo_Escuelas
    })

}
//Exportamos la funcion que crea la primera ventana al index 
module.exports = {
    createWindow
}