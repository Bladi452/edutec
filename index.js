'use strict'

import { app, BrowserWindow } from 'electron'
import devtools from './devtools'

devtools()
if(process.env.NODE_ENV === 'development'){
}

app.on('ready', () => {
    console.dir(app)
    let win = new BrowserWindow({
        width: 1366,
        height: 768,
        frame: false,
        resizable:false,
        webPreferences: {
            nodeIntegration: true,
        }
    })

    win.on('closed', () => {
        win = null,
            app.quit()
    })
    
win.loadURL(`file://${__dirname}/src/renderer/index.html`)
})