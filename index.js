const {createWindow} = require ('./main.js')
const {app} = require('electron')

require('electron-reload')(__dirname);

app.allowRendererProcessReuse = false;
app.whenReady().then(createWindow)