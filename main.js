//Llamar modulos de electron
const {matchPassword} = require('./src/renderer/bycript')
const { BrowserWindow, Notification, ipcMain } = require('electron');
//Se llama la conexion a la base de datos y se iguala a una constante

const { getconexion } = require('./database')

//Se nombran las variables que se estran usando durante el proyecto 
let win;
let winHome;

//Se utiliza para tomar el campo Id que proviene desde el login.js e igualarlo a una variable global
let Id_Admin;

//Lo utilizamos para igualar el campo de la base de datos Id_Escuela que esta relacionado con el administrativo que inicio sesion
let id_Escue;

//Recibe el Id de quien ingreso
ipcMain.on('envio', (event, id) => {
        Id_Admin = id;
    })

    //Creamos la ventana del login

function createWindow() {
    win = new BrowserWindow({
        width: 2366,
        height: 868,
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
        width: 2336,
        height: 868,
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
    const { Nombre, Descripcion, Fecha_Ini, Fecha_Fin } = obj;
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

ipcMain.handle("getChatList", (event) => {
    GetChatList()
})

ipcMain.handle("getChat", (event, obj) => {
    GetChat(obj)
    GetSal(obj)
})
ipcMain.handle("SendMess", (event, obj) => {
    SendMessage(obj)
})
//Iniciamos la funcion pasandole el objeto que contiene los datos a validar
const validarlogin = async (obj) =>  {
    
    let usu = obj.usu;
    let con = obj.con;
    const conn = await getconexion();
  
    const sql = "SELECT usuario.Matricula, usuario.Pass, cargo_seleccionar.Id_Cargo_Seleccionar, cargo.Nivel FROM cargo_seleccionar INNER JOIN cargo ON cargo_seleccionar.Id_Cargo = cargo.Id_Cargo INNER JOIN usuario ON cargo_seleccionar.Matricula = usuario.Matricula WHERE usuario.Matricula = ?"

    const valida= async(results)=>{
   

        const validPassword = await matchPassword(con, results[0].Pass)

if(validPassword){
   
if(results[0].Nivel < 107){
       idEscu();
        createWindowHome();
        winHome.show()
        win.hide()
    }else{
        new Notification({
            title: "EduAtlas",
            body: 'Usted no es administrativo'
        }).show()
    }

    
}else{
        new Notification({
            title: "EduAtlas",
            body: 'La clave es incorrecta'
        }).show()
     } 
    }
    await   conn.query(sql, [usu], (error, results, fields)  => {

        if (error) { console.log(error); }

        if (results.length > 0) {
valida(results)
        }else {
            new Notification({
            title: "EduAtlas",
            body: 'El usuario no existe'
        }).show()}    
    })
}

async function GetDocs() {
    const con = await getconexion();
    const sql = 'SELECT documentos.Id_documentos, documentos.Nombre, documentos.UrlDocs, documentos.Matricula, documentos.Nombre FROM documentos INNER JOIN escuelas ON documentos.Codigo_Escuelas = escuelas.Codigo_Escuelas WHERE documentos.Codigo_Escuelas = ? AND documentos.Estado = "null"';
    await con.query(sql, [id_Escue], (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        winHome.webContents.send('Docs', results)
    })
}

async function SendMessage(obj) {
    const con = await getconexion();
    let sala = obj.sala;
    let mensaje = obj.mensaje;
    const sql = 'INSERT INTO `mensaje` (`mensaje`, `id_Sala`, `Matricula`, `fecha`) VALUES (?, ?, ?, Now());'
    con.query(sql, [ mensaje, sala, Id_Admin], (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        GetChat(sala)
    })
}

//Esta funcion pasa los datos de las solicitudes a cada escuela
async function GetSolicitud() {
    const con = await getconexion();
    const sql = 'SELECT solicitud.Id_Solicitud, solicitud.Fecha, solicitud.Estatus, usuario.Matricula, curso.Grado, escuelas.Nombre FROM solicitud INNER JOIN curso ON solicitud.Id_Curso = curso.ID_Curso INNER JOIN usuario ON usuario.Matricula = solicitud.Matricula INNER JOIN escuelas ON solicitud.Codigo_Escuelas = escuelas.Codigo_Escuelas WHERE solicitud.Codigo_Escuelas = ? AND solicitud.Estatus = "null"';
    await con.query(sql, [id_Escue], (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        winHome.webContents.send('solicitudes', results)
        winHome.webContents.send('contador', results)
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
async function GetSal(obj) {
    const con = await getconexion();
    const sql = 'SELECT * FROM sala WHERE id_Sala = ? '
    await con.query(sql, [obj], (error, results, fields) => {
        if (error) {
            console.log(error)
        }
        winHome.webContents.send('getNom', results)
    })
}

async function GetSolicitudAcep() {
    const con = await getconexion();
    const sql = 'SELECT solicitud.Id_Solicitud, solicitud.Fecha, solicitud.Estatus, usuario.Matricula, curso.Grado, escuelas.Nombre FROM solicitud INNER JOIN curso ON solicitud.Id_Curso = curso.ID_Curso INNER JOIN usuario ON usuario.Matricula = solicitud.Matricula INNER JOIN escuelas ON solicitud.Codigo_Escuelas = escuelas.Codigo_Escuelas WHERE solicitud.Codigo_Escuelas = ? AND solicitud.Estatus = "Aprobado";'
    await con.query(sql, [id_Escue], (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        winHome.webContents.send('solicitudesNew', results)
        winHome.webContents.send('contadorAcep', results.length)
    })
}

async function GetChatList() {
    const con = await getconexion();

    const sql = 'SELECT * FROM sala WHERE Codigo_Escuelas = ?;'
    
    await con.query(sql, [id_Escue], (error, results, fields) => {
        if (error) {
            console.log(error);
        }else{
             winHome.webContents.send('chatList',results)
        }     
    }
)}

async function GetChat(obj) {
    const con = await getconexion();

    const sql = 'SELECT mensaje.fecha, mensaje.mensaje, usuario.Nombre, sala.id_Sala ,sala.Nombre AS nombre_sala FROM mensaje INNER JOIN usuario ON mensaje.Matricula = usuario.Matricula INNER JOIN sala ON mensaje.id_Sala = sala.id_Sala WHERE mensaje.id_Sala = ? ORDER BY `mensaje`.`id` DESC;'
    
    await con.query(sql, [obj], (error, results, fields) => {
        if (error) {
            console.log(error);
        }else{
           winHome.webContents.send('chat',results)
        }     
    }
)}

//SELECT mensaje.fecha, mensaje.mensaje, usuario.Nombre FROM mensaje INNER JOIN usuario ON mensaje.Matricula = usuario.Matricula; 

//

async function GetSolicitudDene() {
    const con = await getconexion();
    const sql = 'SELECT solicitud.Id_Solicitud, solicitud.Fecha, solicitud.Estatus, usuario.Matricula, curso.Grado, escuelas.Nombre FROM solicitud INNER JOIN curso ON solicitud.Id_Curso = curso.ID_Curso INNER JOIN usuario ON usuario.Matricula = solicitud.Matricula INNER JOIN escuelas ON solicitud.Codigo_Escuelas = escuelas.Codigo_Escuelas WHERE solicitud.Codigo_Escuelas = ? AND solicitud.Estatus = "Denegado"'
    await con.query(sql, [id_Escue], (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        winHome.webContents.send('solicitudesDene', results)
        winHome.webContents.send('contadorDen', results.length)
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
 
    const sql = "UPDATE `solicitud` SET `Estatus` = 'Denegado' WHERE `solicitud`.`Id_Solicitud` = ?;"
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
    const sql = "UPDATE `solicitud` SET `Estatus` = 'Aprobado' WHERE `solicitud`.`Id_Solicitud` = ?;"
    
    con.query(sql, [obj], (error, results, fields) => {
        if (error) {
            console.log(error)
        }

    });



} 

//Definimos la relacion entre el administrativo que inicio sesion y la escuela a la que pertenece
async function idEscu() {
    const con = await getconexion();
    const sql = 'SELECT * FROM `usuario` WHERE Matricula = ?'
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