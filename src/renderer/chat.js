const { ipcRenderer} = require('electron');
let chat2
let chat
let lista;
let encabezado
document.addEventListener("DOMContentLoaded", function() {
    lista = document.getElementById("listaDeChat")
    chat = document.getElementById("chat")
    encabezado = document.getElementById("menu")
    chat2 = document.getElementById("text")
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
  let template = ""
    const list = results
    list.forEach(element => {
        template += ` 
        <center>
        <li class="self">
        <div class="msg">
<p>${element.Nombre}:</p>
        <p id="num">${element.mensaje}</p>
          <time>${element.fecha}</time>
        </div>
        </li>
      <center/>
    `
    });

    let con = `
   <input class="textarea" type="text" id="textarea" placeholder="Type here!"/>
   <button class="enviar" type="submit" onclick="enviarMess(${results[0].id_Sala})" >Enviar</button>`
 
   chat2.innerHTML = con;
   chat.innerHTML = template;
 
  })

async function enviarMess(obj){
  let area;
  area = document.getElementById('textarea');
  let areaVal = area.value
  const noveno = {sala: obj, mensaje: areaVal}
  console.log(noveno)
  await ipcRenderer.invoke('SendMess', noveno)
}