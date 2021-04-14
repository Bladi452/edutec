const { ipcRenderer, } = require('electron');
let mylist;

var idHome;

document.addEventListener("DOMContentLoaded", function() {
    mylist = document.getElementById("mylist")
    Letrero = document.getElementById("letrero")

    ipcRenderer.on('idnew', function(event, id) {
        id = idHome
        console.log(id)
    })

    renderGetProducts()
})



function renderGetProducts() {

}


//Letrero.innerHTML = template2;
//})


ipcRenderer.on('products', (event, results) => {
    let template = ""
    const list = results
    list.forEach(element => {
        template += ` 
    <tr>
    <td>${element.Id_Solicitud}</td>
          <td>${element.Fecha}</td>          
          <td>${element.Grado}</td>
          <td>${element.Nombre}</td>          
          <tr>
          <button id = "Cancelar"></button>
          <button id = "Aceptar"></button>
    `
    });

    mylist.innerHTML = template;
})