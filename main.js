const electron = require('electron');
const { app, BrowserWindow } = electron;
const isDev = require('electron-is-dev');
const path = require("path");
const url = require('url');

let mainWindow;

// installing extension in electron
const installExtensionAsync = async () => {
    try {
        const extensions = ["fmkadmapgofadopljbjfkapdkoienihi"];

        for (let extension of extensions) {
            console.log(extension);
            await installExtension(extension);
        }

    } catch (error) {
        console.log("install extension error occurred : ", error);
    }
}


// creating the mainWindow 
function createWindow() {
    mainWindow = new BrowserWindow({
        minWidth: 1280,
        minHeight: 800,

        autoHideMenuBar: true,
        webPreferences: {
            // This will allow to use node in the windowFile
            nodeIntegration: true,
        }
    })
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, 'src', 'index.html'),
            format: 'file',
            slashes: true
        })
    )

    mainWindow.on('close', () => mainWindow === null);


}



// Load window when app is ready in
app.on('ready', async () => {
    try {
        createWindow();

        if (isDev) {
            mainWindow.webContents.on("did-frame-finish-load", () => {
                mainWindow.webContents.once("devtools-opened", () => {
                    mainWindow.focus();
                });
                mainWindow.webContents.openDevTools({
                    mode: 'undocked'
                });
            });
        }
    } catch (error) {
        console.log(error)
    }


});

// setup for mac
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

// start window if there is not active one
app.on('activate', async () => {
    if (mainWindow == null) {
        createWindow();
    }
})

if (isDev) {
    try {
        require('electron-reloader')(module, {
            debug: true,
            watchRenderer: true
        });
    } catch (_) { console.log('Error'); }
}