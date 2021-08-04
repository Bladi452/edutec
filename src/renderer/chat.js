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
    </li>    `
    });
    mylist.innerHTML = template;
})