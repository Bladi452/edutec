const { ipcRenderer,} = require('electron');
var http = require('http'); 
var fs = require('fs');

let mylist;
let image;

document.addEventListener("DOMContentLoaded", function() {
    image = document.getElementById("image")
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
          <button type="submit" onclick="getDocumentos('${element.Id_documentos}', '${element.Nombre}', '${element.Matricula}')">Descargar</button>
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

async function getDocumentos(id, nombre, matricula) {
 var request = http.get(`http://localhost:3000/document/descarga/${id}`,function(response) { response.pipe(file); });
 const san = `${nombre}${matricula}.png`
 let ruta = `/upload/${san}`
 let com = __dirname + ruta
 var file = fs.createWriteStream(com);
 // y to eso
 //estoy probando con varias imagenes
 //a
    image.innerHTML="<img src='./upload/Escu20211015.png' width='400px' height='150px'>"

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