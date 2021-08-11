let chat
let mylist;
let lista;

document.addEventListener("DOMContentLoaded", function() {
    lista = document.getElementById("listaDeChat")
    chat = document.getElementById("chat")
    mylist = document.getElementById("mylist")
    renderGetProducts()
setInterval('renderGetProducts()', 1000)
})


async function renderGetProducts() {
    await ipcRenderer.invoke('getChatList')
}

ipcRenderer.on('Docs', (_event, results) => {
    let template = ""
    const list = results
    list.forEach(element => {
        template += ` 
    <tr>
          <td>${element.Id_documentos}</td>
          <td>${element.Nombre}</td>
          <button type="submit" onclick="getDocumentos('${element.Id_documentos}', '${element.Nombre}', '${element.Matricula}')">Descargar</button>
          <button type="submit" onclick="getImage('${element.Nombre}', '${element.Matricula}')">Visualizar</button>
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

/*
Mensaje del administrador
<li class="self">
<div class="msg">
  <p>Puff...</p>
  <p>Aún estoy haciendo el contexto de Góngora.</p>
  <p>Mejor otro día</p>
  <time>20:18</time>
</div>
</li>
*/

/*
mensaje de la otra persona
<li class="other">
          <div class="msg">
            <p>Hola!</p>
            <p>Te vienes a cenar al centro?</p>
            <time>20:17</time>
          </div>
        </li>
        */
/*
menu
nombre del estudiante
<div class="name">Alex</div>              
         */

ipcRenderer.on('chatList', (event, results) => {
    let template = ""
    const list = results
    list.forEach(element => {
        template += `
        <li class="list-group-item">
        <div class="media-body">
            <center>
                <strong></strong>
                <strong>Solicitud</strong>
            </center>
        </div>
    </li>`
    });
    lista.innerHTML = template;
})