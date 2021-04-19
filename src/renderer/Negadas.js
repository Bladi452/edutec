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
    await ipcRenderer.invoke('getDene')
}

ipcRenderer.on('solicitudesDene', (event, results) => {
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
<td>   <button id = "Aceptar" 
      onclick="ValidarSol('${element.Id_Solicitud}')">✓</button>
</td>
          <tr>
    `
    });

    mylist.innerHTML = template;
    })

async function ValidarSol(Id_Solicitud) {
const response = confirm('¿Estas seguro que deseas aceptar la solicitud?')
if(response){
    await ipcRenderer.invoke("Aceptar_Canal", Id_Solicitud )
}
 return;
}