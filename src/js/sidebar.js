const currentLoadedFile = window.location.href.split('/html/')[1];
const currentSideBarTab = document.querySelector(`a.aside-btn[href="./${currentLoadedFile}"]`);
currentSideBarTab.className = currentSideBarTab.className + ' active'

