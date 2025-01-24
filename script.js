const form = document.querySelector('form');
const trHead = document.querySelector('#head');
const conData = document.querySelector('#data');
const nameInput = document.querySelector('#name');
const addressInput = document.querySelector('#address');
const phoneInput = document.querySelector('#phone');
const emailInput = document.querySelector('#email');
const urlInput = document.querySelector('#website');
const button = document.querySelector('button');

let db;

window.onload = () => {
    let request = window.indexedDB.open('contacts', 1);

    request.oneerror = () => {
        console.log('Database failed to open');
    }

    request.onsuccess = () => {
        console.log('Database opened successfully');
        db = request.result;

        // Move the form.onsubmit event handler inside the onsuccess event handler
        form.onsubmit = (e) => {
            e.preventDefault();
            let newItem = { 
                name: nameInput.value,
                address: addressInput.value,
                phone: phoneInput.value,
                email: emailInput.value,
                url: urlInput.value
            };

            let transaction = db.transaction(['contacts'], 'readwrite');
            let objectStore = transaction.objectStore('contacts');
            var request = objectStore.add(newItem);

            request.onsuccess = () => {
                console.log('Item added to database');
                nameInput.value = '';
                addressInput.value = '';
                phoneInput.value = '';
                emailInput.value = '';
                urlInput.value = '';
            }

            request.onerror = () => {
                console.log('Item not added to database');
            }

            transaction.oncomplete = () => {
                console.log('Transaction completed');
            }
        };

        //displayData();
    }

    request.onupgradeneeded = (e) => {
        let db = e.target.result;
        let objectStore = db.createObjectStore('contacts', {keyPath: 'id', autoIncrement: true});

        objectStore.createIndex('name','name', {unique: true});
        objectStore.createIndex('address','address', {unique: false});
        objectStore.createIndex('phone','phone', {unique: false});
        objectStore.createIndex('email','email', {unique: true});
        objectStore.createIndex('url','url', {unique: false});

        console.log('Database setup complete');
    }

    function displayData() {
        
    }
}