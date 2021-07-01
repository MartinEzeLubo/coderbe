const config = require('./config')
import cluster from 'cluster'
import numCPUs from 'os'

import "core-js";
import "regenerator-runtime/runtime";

import cors from 'cors'
import session, { Store } from 'express-session'
import express from 'express';
import router from './routes/index';
import compression from 'compression'
import winston from 'winston'
import { listarProductos } from './service/productos.service';
import {guardarMensaje, listarMensajes} from './service/chat.service';

const yargs = require('yargs').argv;
const cpus = numCPUs.cpus().length;
const handlebars = require('express-handlebars');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const mongoDBStore = require('connect-mongodb-session')(session)
const sessionStore = new mongoDBStore({
  uri: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-shard-00-00.womr0.mongodb.net:27017,cluster0-shard-00-01.womr0.mongodb.net:27017,cluster0-shard-00-02.womr0.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-ftyf8w-shard-0&authSource=admin&retryWrites=true&w=majority`,
  collection: 'sessions'
})



///////////////////////
console.log(config);

///////////////////////



app.use(express.static('scripts'));
// app.use("public",express.static(__dirname + "/public"));

app.set('PORT', yargs.port || 8080);
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: [`http://localhost:${yargs.port || 8080}`], credentials: true }))
app.use(compression())

app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: 'index.hbs',
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");


app.use(session({
  store: sessionStore,
  secret: 'password',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 600000 },
  rolling: true
}))

app.use('/', router);



export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'warn.log', level: 'warn' }),
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  ],
});



io.on('connection', async (socket)=>{
  updateProducList();
  updateChat();

  socket.on('update', ()=>{
    socket.emit()
    
  })

  socket.on('update', async (data)=>{
    updateProducList();  
  })
  socket.on('sendmessage', (data)=>{
    guardarMensaje(data);
    socket.broadcast.emit('newmessage', data);
    
  })
  socket.on('writing', (data)=>{
    socket.broadcast.emit('whoiswriting', data);
    
  })

})

export async function updateProducList(){
  let list = await listarProductos('');
  io.sockets.emit('productos', list);
};

export async function updateChat(){
  let chat = await listarMensajes();
  console.log('updateChat');
  io.sockets.emit('chat', chat);
}


if (config.MODE === "cluster") {
  if (cluster.isMaster) {
    console.log('Trabajando modo Cluster');
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < cpus; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
    })

  } else {
    http.listen(app.get('PORT'), () => {
      return console.log(`Servidor listo en puerto ${app.get('PORT')}`);
    }).on('error', () => console.log('El puerto configurado se encuentra en uso'));
    console.log(`Worker ${process.pid} started`);

  }

} else {
  http.listen(app.get('PORT'), () => {
    console.log('Trabajando modo Fork');
    return console.log(`Servidor listo en puerto ${app.get('PORT')}`);
  }).on('error', () => console.log('El puerto configurado se encuentra en uso'));
}




