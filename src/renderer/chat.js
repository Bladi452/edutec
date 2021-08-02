let mylist;


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

        <div class="chat_list">
        <div class="chat_people">
          <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
          <div class="chat_ib">
            <h5>${element.Nombre}<span class="chat_date">{}</span></h5>
            <p>${element.Message}</p>
          </div>
        </div>
      </div>
    `
    });
    mylist.innerHTML = template;
})