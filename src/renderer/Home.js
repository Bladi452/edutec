const { ipcRenderer } = require('electron');
let mylist;


document.addEventListener("DOMContentLoaded", function() {
    mylist = document.getElementById("mylist")
    Letrero = document.getElementById("letrero")
    renderGetProducts()
})


async function renderGetProducts() {
    await ipcRenderer.invoke('get')
}



ipcRenderer.on('solicitudes', (event, results) => {
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
          <tr>
          <button id = "Cancelar"></button>
          <button id = "Aceptar"></button>
    `
    });

    mylist.innerHTML = template;
})