

// @ changing sidebar active btn
const currentLoadedFile = window.location.href.split('/html/')[1];
const currentSideBarTab = document.querySelector(`a.aside-btn[href="./${currentLoadedFile}"]`);
currentSideBarTab.className = currentSideBarTab.className + ' active'

const electron = require('electron');
const { ipcRenderer } = electron;

const contactUsBtn = document.getElementById('contact-us-btn');
const contactUsNav = document.getElementById('contact-us-nav');

contactUsBtn.addEventListener('click', () => {
    ipcRenderer.send("create:window", 'contact-us-win');
})

contactUsNav.addEventListener('click', () => {
    ipcRenderer.send("create:window", 'contact-us-win');

})