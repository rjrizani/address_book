const form = document.querySelector('form');
const trHead = document.querySelector('#head');
const conData = document.querySelector('#data');
const nameInput = document.querySelector('#name');
const addressInput = document.querySelector('#address');
const phoneInput = document.querySelector('#phone');
const emailInput = document.querySelector('#email');
const urlInput = document.querySelector('#website');
const button = document.querySelector('button');

window.onload = () => {
    let request = window.indexedDB.open('contacts', 1);
}