const {createWindow} = require ('./main.js')
const {app} = require('electron')

//Compi
require('electron-reload')(__dirname);

app.allowRendererProcessReuse = false;
app.whenReady().then(createWindow)