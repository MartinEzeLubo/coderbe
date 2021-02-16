import express from 'express';
import apiRouter from './routes/api/api';
import webRouter from './routes/web/web';
import {listProducts, saveProduct} from './archivos/productCRUD';
import { Socket } from 'dgram';

const port = 8080;
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);



app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use('/api', apiRouter);
app.use('/', webRouter);


async function getProducts() {
  let data = await listProducts();
  return data;
}

io.on('connection', async (socket)=>{
  updateProducList();

  socket.on('newproduct', async (data)=>{
    console.log(data);
    let saved = saveProduct(data.title, parseInt(data.price), data.thumbnail);
    updateProducList();  
  })
})

export async function updateProducList(){
  let list = await listProducts();
  io.sockets.emit('productlist', list);
};





http.listen(port, () => {
  
  return console.log(`Servidor listo en puerto ${port}`);
}).on('error', ()=>console.log('El puerto configurado se encuentra en uso'));


module.exports = {updateProducList};