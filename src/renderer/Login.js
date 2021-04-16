const { ipcRenderer} = require('electron');
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

    //Se activa al hacer click en el boton
    btnlogin.onclick = function() {
        //igualamos el valor del campo con la variable id
        id = logiusuario.value
        console.log(id)
        //Se envia al MAIN para confirmar si es correcto 
        ipcRenderer.send('envio', (event, id))
        //se envian los usuarios y contraseñas a metodo principal
        const obj = { usu: logiusuario.value, con: logicontra.value }
        ipcRenderer.invoke('login', obj);
    }
}