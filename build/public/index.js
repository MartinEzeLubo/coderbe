const socket = io();

let chat;
let input;
let writingAdvice;
let timeHandler;

document.addEventListener("DOMContentLoaded", event => {
    chat = document.getElementById('chat-content');
    writingAdvice = document.getElementById('writing')
    input = document.getElementById("messagetext");
    input.addEventListener('keypress', e =>{
        if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById("sendButton").click();
        } else {
            socket.emit('writing', socket.id);  
        }
     });
});

socket.on('productlist', info =>{
    renderList(info);

});

socket.on('whoiswriting', data =>{
    window.clearTimeout(timeHandler);
    writingAdvice.textContent = `${data} esta escribiendo ...`
    timeHandler = setTimeout(() => { 
        writingAdvice.textContent = ``
    }, 1000);})


socket.on('newmessage', data =>{
    console.log("newmessage Log");
    

    let chatMessage = `<div class="media media-chat"> 
        <img class="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="...">
        <div class="media-body">
            <p>${data.sender}: ${data.message}</p>
            <p style="color: black; background-color: white; font-size: 12px">${moment().format('LT')}</p>
        </div>
    </div>`
    chat.innerHTML += chatMessage;
    chat.scrollTop = chat.scrollHeight;


})

function renderList(data){
    let tbody = ``;

    data.forEach(element => {
        let row = `<tr>
            <td class="align-middle">${element.title}</td>
            <td class="align-middle">${element.price}</td>
            <td class="align-middle"><img src=${element.thumbnail} alt="" style="width: 70px; height: 70px"></td>
        </tr>`
        
        
        tbody = `${tbody}
        ${row}`;
    });
    
    let table = `<thead>
        <tr>
            <th scope="col">Producto</th>
            <th scope="col">Precio</th>
            <th scope="col">Imagen</th>
        </tr>
    </thead>
    <tbody> 
        ${tbody}            
    </tbody>`

    document.getElementById('productList').innerHTML = table;

};

function saveProduct(){
    let producto = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    }

    socket.emit('newproduct', producto);
}

function sendMessage(){
    if(document.getElementById('messagetext').value === ''){
        return false;
    }
    let newMessage = {
        sender: socket.id,
        message: document.getElementById('messagetext').value
    }
    socket.emit('sendmessage', newMessage);

    let chatMessage = `<div class="media media-chat media-chat-reverse">
        <div class="media-body">
            <p>${document.getElementById('messagetext').value}</p>
            <p style="color: black; background-color: white; font-size: 12px">${moment().format('LT')}</p>
        </div>
    </div>`
    
    chat.innerHTML += chatMessage;
    chat.scrollTop = chat.scrollHeight;
    input.value = "";
    

};

