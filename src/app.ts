import "core-js";
import "regenerator-runtime/runtime";

import express from 'express';
import apiRouter from './routes/api/api';
import webRouter from './routes/web/web';
import {listProducts, saveProduct} from './archivos/productCRUD';
import {writeMessage, listChat} from './archivos/chatLog';

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);



app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set('PORT', process.env.PORT || 8080);
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use('/api', apiRouter);
app.use('/', webRouter);



io.on('connection', async (socket)=>{
  updateProducList();
  updateChat();
  
  socket.on('newproduct', async (data)=>{
    let saved = saveProduct(data.title, parseInt(data.price), data.thumbnail);
    updateProducList();  
  })
  
  socket.on('sendmessage', (data)=>{
    writeMessage(data.sender, data.message, data.date);
    socket.broadcast.emit('newmessage', data);
    
  })
  socket.on('writing', (data)=>{
    socket.broadcast.emit('whoiswriting', data);
    
  })
});


export async function updateProducList(){
  
  let list = await listProducts();
  io.sockets.emit('productlist', list);
};

async function updateChat(){
  let chat = await listChat();
  io.sockets.emit('chat', chat);
}



http.listen(app.get('PORT'), () => {
  
  return console.log(`Servidor listo en puerto ${app.get('PORT')}`);
}).on('error', ()=>console.log('El puerto configurado se encuentra en uso'));

module.exports = {updateProducList};




