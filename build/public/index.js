const socket = io();

let productTitle;
let productPrice;
let productThumbnail;
let productList;
let chat;
let userid;
let input;
let writingAdvice;
let timeHandler;



document.addEventListener("DOMContentLoaded", event => {
    productList = document.getElementById('productList');
    chat = document.getElementById('chat-content');
    writingAdvice = document.getElementById('writing')
    userid = document.getElementById("userid");
    input = document.getElementById("messagetext");
    productTitle = document.getElementById('title');
    productPrice = document.getElementById('price');
    productThumbnail = document.getElementById('thumbnail');
    

    input.addEventListener('keypress', e =>{
        if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById("sendButton").click();
        } else {
            socket.emit('writing', userid.value);  
        }
     });
});

socket.on('productlist', info =>{
    renderList(info);
});
socket.on('chat', info =>{
    info.forEach(element =>{

        let chatMessage = `<div class="media media-chat"> 
            <img class="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="...">
            <div class="media-body">
                <p>${element.sender}: ${element.message}</p>
                <p style="color: black; background-color: white; font-size: 12px">${element.date}</p>
            </div>
        </div>`
        chat.innerHTML += chatMessage;
        chat.scrollTop = chat.scrollHeight;
    });

});

socket.on('whoiswriting', data =>{
    window.clearTimeout(timeHandler);
    writingAdvice.textContent = `${data} esta escribiendo ...`
    timeHandler = setTimeout(() => { 
        writingAdvice.textContent = ``
    }, 1000);})


socket.on('newmessage', data =>{
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

    productList.innerHTML = table;

};

function saveProduct(){
    let producto = {
        title: productTitle.value,
        price: productPrice.value,
        thumbnail: productThumbnail.value
    }
    socket.emit('newproduct', producto);
    return false;
}

function sendMessage(){
    let messageTime = moment().format('LT');

    if(userid.value === ''){
        userid.placeholder = 'Ingrese su correo!'
        userid.focus();
        return false;
    }
    if(input.value === ''){
        console.log("asdasd");
        return false;
    }
    let newMessage = {
        sender: userid.value,
        message: input.value,
        date: messageTime
    }
    socket.emit('sendmessage', newMessage);

    let chatMessage = `<div class="media media-chat media-chat-reverse">
        <div class="media-body">
            <p>${input.value}</p>
            <p style="color: black; background-color: white; font-size: 12px">${messageTime}</p>
        </div>
    </div>`
    
    chat.innerHTML += chatMessage;
    chat.scrollTop = chat.scrollHeight;
    input.value = "";
    

};



