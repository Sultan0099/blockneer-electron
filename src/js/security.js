const electron = require('electron');
const { ipcRenderer } = electron;


const newPincodeBtn = document.getElementById('new-pincode');
const sendVerCode = document.getElementById('send-ver-code');

newPincodeBtn.addEventListener('click', createNewPincodeWin);
sendVerCode.addEventListener('click', createVerCodeWin);

function createNewPincodeWin() {
    ipcRenderer.send('create:window', 'new-pincode-window');
}

function createVerCodeWin() {
    ipcRenderer.send('create:window', 'new-verification-win');
}



// function createNewPincodeWin() {
//     const remote = require('electron').remote;
//     const { BrowserWindow } = remote;

//     if (!newPincodeWin) {
//         newPincodeWin = new BrowserWindow({
//             width: 500,
//             height: 600,
//             title: "New Pincode",
//             hasShadow: true,
//             webPreferences: {
//                 nodeIntegration: true,
//                 enableRemoteModule: true,
//             },
//         })
//         newPincodeWin.removeMenu();
//         newPincodeWin.minimizable = false;
//         newPincodeWin.maximizable = false;

//         newPincodeWin.loadURL(url.format({
//             pathname: path.join(__dirname, 'newPincode.html'),
//             format: 'file',
//             slashes: true
//         }))

//     } else return;

//     newPincodeWin.on('close', () => newPincodeWin = null)
// }
