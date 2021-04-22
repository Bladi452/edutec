const { ipcRenderer} = require('electron');

var id;
let Nombre;
let Descripcion;
let FechaIni;
let FechaFin;
let btnAgregar;

//Cuando la ventana abre se cargan estos datos
window.onload = function() {

    //Se toman las ubicacion es de los textbox
    Nombre = document.getElementById('Nombre');
    Descripcion = document.getElementById('Descripcion');
    FechaIni = document.getElementById('Ini');
    FechaFin = document.getElementById('Fin');
    btnAgregar = document.getElementById('AgreEven')

    //Se activa al hacer click en el boton
    btnAgregar.onclick = function() {
        //igualamos el valor del campo con la variable id
        //se envian los usuarios y contraseñas a metodo principal
        const obj = { Nombre: Nombre.value, Descripcion: Descripcion.value ,Fecha_Ini: FechaIni.value, Fecha_Fin: FechaFin.value}
        ipcRenderer.invoke('AgreEvent2', obj);
    }
}