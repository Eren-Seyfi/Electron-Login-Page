const { ipcRenderer } = require("electron");
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

window.addEventListener("DOMContentLoaded", () => {

let Avatarİcon = document.getElementById("avatar-icon")
Avatarİcon.src=""



});
