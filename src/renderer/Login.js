const { remote, ipcRenderer, ipc, webContents } = require('electron');
var id;
let logiusuario;
let logicontra;
let btnlogin;

window.onload = function() {
    logiusuario = document.getElementById('usuario');
    logicontra = document.getElementById('contra');
    btnlogin = document.getElementById('Ini');

    btnlogin.onclick = function() {
        id = logiusuario.value
        console.log(id)
        ipcRenderer.send('envio', (event, id))
        const obj = { usu: logiusuario.value, con: logicontra.value }
        ipcRenderer.invoke('login', obj);
    }
    ipcRenderer.on("message", (event, message) => { console.log(message); });
}