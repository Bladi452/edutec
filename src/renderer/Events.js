const { ipcRenderer } = require('electron');
let mylist;

document.addEventListener("DOMContentLoaded", function() {
    mylist = document.getElementById("mylist")
    Letrero = document.getElementById("letrero")
setInterval('renderGetProducts()', 1000)    
})


async function renderGetProducts() {
    await ipcRenderer.invoke('eventos')
}

ipcRenderer.on('eventos', (event, results) => {
    let template = ""
    const list = results
    list.forEach(element => {
        template += ` 
    <tr>
    <td>${element.Id_Eventos}</td>
          <td>${element.Nombre}</td>
          <td>${element.Fecha_Ini}</td>
          <td>${element.Fecha_Fin}</td>
          <td>${element.Descripcion}</td>
          <tr>
    `
    });

    mylist.innerHTML = template;
    })