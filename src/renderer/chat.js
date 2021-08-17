const { ipcRenderer} = require('electron');

let chat
let lista;
let encabezado
document.addEventListener("DOMContentLoaded", function() {
    lista = document.getElementById("listaDeChat")
    chat = document.getElementById("chat")
    encabezado = document.getElementById("menu")
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
// <div class="back"><i class="fa fa-chevron-left"></i> <img src="" draggable="false"/></div>
ipcRenderer.on('getNom', (_event, results) => {
  console.log(results)
  let template = ""
    const list = results
    list.forEach(element => {
        template += `
        <center>
        <div class="back"><i class="fa fa-chevron-left"><h4>${element.Nombre}</h4></i></div>
</center>
        `
    });

    encabezado.innerHTML = template;
})
//<div class="back"><i class="fa fa-chevron-left"></i> <img src="" draggable="false"/></div>`


async function ChatMess (id_sala) {
     await ipcRenderer.invoke('getChat', id_sala)
    }


ipcRenderer.on('chat', (_event, results) => {
  console.log(results)
  let template = ""
    const list = results
    list.forEach(element => {
        template += ` 
        <center>
        <li class="self">
        <div class="msg">
<p>${element.Nombre}:</p>
        <p>${element.mensaje}</p>
          <time>${element.fecha}</time>
        </div>
        </li>
      <center/>
      <input class="textarea" type="text" placeholder="Type here!"/>
<button class="enviar" type="submit" onclick="enviarMess(${element.id_Sala})" >Enviar</button>
    `
    });

    chat.innerHTML = template;
})

async function enviarMess(obj){
await ipcRenderer.invoke('SendMess', obj)
}