import express from 'express';
import apiRouter from './routes/api/api';
import webRouter from './routes/web/productos/productos';

const port = 8080;
const app = express();
const http = require('http').Server(app);
const socket = require('socket.io')(http);



app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.use('/api', apiRouter);
app.use('/', webRouter);




http.listen(port, () => {
  
  return console.log(`Servidor listo en puerto ${port}`);
}).on('error', ()=>console.log('El puerto configurado se encuentra en uso'));

