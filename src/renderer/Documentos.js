const { ipcRenderer, net } = require('electron');
const axios = require('axios');

let mylist;


document.addEventListener("DOMContentLoaded", function() {
    mylist = document.getElementById("mylist")
    renderGetProducts()
setInterval('renderGetProducts()', 1000)
})


async function renderGetProducts() {
    await ipcRenderer.invoke('getDocs')
}

ipcRenderer.on('Docs', (event, results) => {
    let template = ""
    const list = results
    list.forEach(element => {
        template += ` 
    <tr>
          <td>${element.Id_documentos}</td>
          <td>${element.Nombre}</td>
          <button type="submit" onclick="getDocumentos('${element.Id_documentos}')">Descargar</button>
          <td>${element.Matricula}</td>

          <td>  <button id = "Cancelar"
onclick="CancelarDocs('${element.Id_documentos}')">x</button>
      <button id = "Aceptar"
      onclick="ValidarDocs('${element.Id_documentos}')">✓</button>
</td>
          <tr>
    `
    });

    mylist.innerHTML = template;
})
async function CancelarDocs(Id_documentos) {
    const response = confirm('¿Estas seguro que deseas Denegar el documento?')
    if (response) {
        await ipcRenderer.invoke("Denegar_documentos", Id_documentos)
    }
    return;
}
async function getDocumentos(id) {

    const response = await axios.get(`http://localhost:3000/document/descarga/${id}`)
 /*     console.log(response)
*/ console.log(response)
console.log('soy yo')
 }
    
async function ValidarDocs(Id_documentos) {
    const response = confirm('¿Estas seguro que deseas aceptar la solicitud?')
    if (response) {
        await ipcRenderer.invoke("Aceptar_documentos", Id_documentos)
    }
    return;
}

function acep() {
    location.href = "Solicitudes.html"
}

function dene() {
    location.href = "Denegadas.html"
}

function pen() {
    location.href = "Home.html"
}