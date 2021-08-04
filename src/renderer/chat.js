let mylist;
//romo


document.addEventListener("DOMContentLoaded", function() {
    mylist = document.getElementById("mylist")
    Letrero = document.getElementById("letrero")
    renderGetProducts()
setInterval('renderGetProducts()', 1000)
})


async function renderGetProducts() {
    await ipcRenderer.invoke('getChat')
}

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

ipcRenderer.on('solicitudesNew', (event, results) => {
    let template = ""
    const list = results
    list.forEach(element => {
        template += `
        <li class="list-group-item" onclick="Solicitud()">
        <div class="media-body">
            <center>
                <strong>Solicitud</strong>
            </center>
        </div>
    </li>`
    });
    mylist.innerHTML = template;
})