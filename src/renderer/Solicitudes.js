const { ipcRenderer, Renderer } = require('electron');
let btnCancelar;
let btnAceptar;
let mylist;

document.addEventListener("DOMContentLoaded", function() {
    mylist = document.getElementById("mylist")
    Letrero = document.getElementById("letrero")
    renderGetProducts()
})


async function renderGetProducts() {
    await ipcRenderer.invoke('getAceptar')
}

ipcRenderer.on('solicitudesNew', (event, results) => {
    let template = ""
    const list = results
    list.forEach(element => {
        template += ` 
    <tr>
    <td>${element.Id_Solicitud}</td>
          <td>${element.Fecha}</td>       
          <td>${element.Grado}</td>
          <td>${element.Matricula}</td>
          <td>${element.Nombre}</td>
          <td>${element.Estatus}</td>       
<td>  <button id = "Cancelar" 
onclick="CancelarSol('${element.Id_Solicitud}')">x</button>
</td>
          <tr>
    `
    });

    mylist.innerHTML = template;
    })
    async function CancelarSol(Id_Solicitud){
        const response =  confirm('¿Estas seguro que deseas Denegar la solicitud?')
           if (response) {
           await  ipcRenderer.invoke("Denegar_canal", Id_Solicitud  )
        }
           return; 
       }

       function acep(){
        location.href="Solicitudes.html"
    }
    function dene(){
        location.href="Denegadas.html"
    }
    function pen(){
        location.href="Home.html"
    }