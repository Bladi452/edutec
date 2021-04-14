const { ipcRenderer, ipc } = require('electron');
let id;
let logiusuario;
let logicontra;
let btnlogin;

window.onload = function() {
    logiusuario = document.getElementById('usuario');
    logicontra = document.getElementById('contra');
    btnlogin = document.getElementById('Ini');

    btnlogin.onclick = function() {
        const obj = { usu: logiusuario.value, con: logicontra.value }
        ipcRenderer.invoke('login', obj);
        id = logiusuario
        ipcRenderer.sendTo('idnew', id);
    }


}