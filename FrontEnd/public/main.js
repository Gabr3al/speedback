const { app, BrowserWindow } = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        width: 1024,
        height: 600,
        resizable: false,
        fullscreen: false,
        fullscreenable: false,
        frame: false,
        webPreferences: {}
    })

    win.loadURL('http://localhost:3000')
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})