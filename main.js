const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;
const isDev = require('electron-is-dev');
const path = require("path");
const url = require('url');

let mainWindow, newPincodeWin, verificationCodeWin, contactUsWin;

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
        title: "Blockneer",

        autoHideMenuBar: true,
        webPreferences: {
            // This will allow to use node in the windowFile
            nodeIntegration: true,
            enableRemoteModule: true,
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

/*
    ----------------------
    @ window for pin code
    ----------------------
*/

function createNewPincodeWin() {
    if (!newPincodeWin) {
        newPincodeWin = new BrowserWindow({
            width: 500,
            height: 600,
            title: "New Pincode",
            hasShadow: true,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
            },
        })
        newPincodeWin.removeMenu();
        newPincodeWin.minimizable = false;
        newPincodeWin.maximizable = false;

        newPincodeWin.loadURL(url.format({
            pathname: path.join(__dirname, 'src', 'html', 'newPincode.html'),
            format: 'file',
            slashes: true
        }))

    } else return;

    newPincodeWin.on('close', () => newPincodeWin = null)
}

/*
    ------------------------------
    @ window for verification code
    ------------------------------
*/

function createVerCodeWin() {
    if (!verificationCodeWin) {
        verificationCodeWin = new BrowserWindow({
            width: 500,
            height: 600,
            title: "Verify Code",
            hasShadow: true,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
            },
        })
        verificationCodeWin.removeMenu();
        verificationCodeWin.minimizable = false;
        verificationCodeWin.maximizable = false;

        verificationCodeWin.loadURL(url.format({
            pathname: path.join(__dirname, 'src', 'html', 'verificationCode.html'),
            format: 'file',
            slashes: true
        }))

    } else return;

    verificationCodeWin.on('close', () => verificationCodeWin = null)
}
/*
    ------------------------------
    @ window for contact us 
    ------------------------------
*/

function createContactUsWin() {
    if (!contactUsWin) {
        contactUsWin = new BrowserWindow({
            width: 600,
            height: 700,
            title: "Verify Code",
            hasShadow: true,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
            },
        })
        contactUsWin.removeMenu();
        contactUsWin.minimizable = false;
        contactUsWin.maximizable = false;

        contactUsWin.loadURL(url.format({
            pathname: path.join(__dirname, 'src', 'html', 'contactForm.html'),
            format: 'file',
            slashes: true
        }))

    } else return;

    contactUsWin.on('close', () => contactUsWin = null)
}

ipcMain.on('create:window', (e, winName) => {
    console.log(winName);
    if (winName === 'new-pincode-window') {
        createNewPincodeWin();
    } else if (winName === "new-verification-win") {
        createVerCodeWin();
    } else if (winName === "contact-us-win") {
        createContactUsWin();
    }
})


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