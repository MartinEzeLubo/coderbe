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

export const DB_SELECTION = "mongo";


// import * as database from './repositories/mongo.dao';
// export const db = dbSelected
// export const db = new database.mongoDAO;


const cpus = numCPUs.cpus().length;
const handlebars = require('express-handlebars');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const mongoDBStore = require('connect-mongodb-session')(session)
const sessionStore = new mongoDBStore({
  uri: 'mongodb://mongoadmin:mongoadmin@cluster0-shard-00-00.womr0.mongodb.net:27017,cluster0-shard-00-01.womr0.mongodb.net:27017,cluster0-shard-00-02.womr0.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-ftyf8w-shard-0&authSource=admin&retryWrites=true&w=majority',
  collection: 'sessions'
})


app.use(express.static('scripts'));
// app.use("public",express.static(__dirname + "/public"));


app.set('PORT', process.env.PORT || 8080);
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ['http://localhost:8080'], credentials: true }))
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

  
  socket.on('update', ()=>{
    socket.emit()
    
  })

});

io.on('connection', async (socket)=>{
  updateProducList();

  socket.on('update', async (data)=>{
    updateProducList();  
  })
})

export async function updateProducList(){
  let list = await listarProductos('');
  io.sockets.emit('productos', list);
};




if (process.argv[4] === "cluster") {
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




