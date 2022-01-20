let  form      = document.querySelector('form');
let search     = document.querySelector('input');
let messageOne = document.querySelector('.message-1');
let messagetwo = document.querySelector('.message-2');

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    let location = search.value;
    messageOne.textContent = 'Loding....';
    messagetwo.textContent = '';
    fetch('http://localhost:3000/weather?address='+ location ).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error;
        } else {
            messageOne.textContent = data.location;
            messagetwo.textContent = data.forecast;
        }
        
    })
})
})