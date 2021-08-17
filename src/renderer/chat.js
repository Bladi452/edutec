const { ipcRenderer,} = require('electron');

let chat
let lista;

document.addEventListener("DOMContentLoaded", function() {
    lista = document.getElementById("listaDeChat")
    chat = document.getElementById("chat")
    renderGetProducts()
})

async function renderGetProducts() {
 await ipcRenderer.invoke('getChatList')
}

ipcRenderer.on('chatList', (_event, results) => {
    let template = ""
    let list = results;
    list.forEach(element => {
        template += `
        <li class="list-group-item">
        <div class="media-body" onclick="ChatMess(${element.id_Sala})">
            <center>
                <strong>${element.Nombre}</strong>
            </center>
        </div>
    </li>`
    });
    lista.innerHTML = template;
  })

  async function ChatMess (id_sala) {
     await ipcRenderer.invoke('getChat', id_sala)
  }



ipcRenderer.on('chat', (_event, results) => {
  let template = ""
    const list = results
    list.forEach(element => {
        template += ` 
        <li class="self">
        <div class="msg">
          <p>${element.mensaje}</p>
          <time>${element.fecha}</time>
        </div>
        </li>    
    `
    });

    chat.innerHTML = template;
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
})       */
