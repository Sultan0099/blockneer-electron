// electron is declared in sidebar 


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


