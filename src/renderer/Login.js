const { ipcRenderer} = require('electron');
const {encryptPassword} = require('./bycript')
var id;
let logiusuario;
let logicontra;
let btnlogin;
//Cuando la ventana abre se cargan estos datos
window.onload = function() {
    //Se toman las ubicacion es de los textbox
    logiusuario = document.getElementById('usuario');
    logicontra = document.getElementById('contra');
    btnlogin = document.getElementById('Ini');
    const pass = await encryptPassword(logicontra.value)
    //Se activa al hacer click en el boton
    btnlogin.onclick = function() {
        //igualamos el valor del campo con la variable id
        id = logiusuario.value
        //Se envia al MAIN para confirmar si es correcto 
        ipcRenderer.send('envio', (event, id))
        //se envian los usuarios y contraseñas a metodo principal
        const obj = { usu: logiusuario.value, con: pass }
        ipcRenderer.invoke('login', obj);
    }
}