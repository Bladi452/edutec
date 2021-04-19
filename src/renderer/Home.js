const { ipcRenderer } = require('electron');
let btnCancelar;
let btnAceptar;
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
<td>  <button id = "Cancelar" onclick="DenegarSol()" value = "${element.Id_Solicitud}">x</button>
      <button id = "Aceptar" value = "${element.Id_Solicitud}">✓</button>
</td>
          <tr>
    `
    });

    mylist.innerHTML = template;
})


async function DenegarSol(e) {
prueba = e.value
const id_denegar = {Id_Solicitud: parseInt(prueba)}
console.log(id_denegar)
await  ipcRenderer.invoke("Denegar_canal", id_denegar)
}