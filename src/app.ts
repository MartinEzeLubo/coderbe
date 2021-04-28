import "core-js";
import "regenerator-runtime/runtime";

import cors from 'cors'
import session, { Store } from 'express-session'
import express from 'express';
import router from './routes/index';
import * as database from './repositories/mongo.dao';


export const db = new database.mongoDAO;

const app = express();
const http = require('http').Server(app);
const mongoDBStore = require('connect-mongodb-session')(session)
const sessionStore = new mongoDBStore({
  uri: 'mongodb://mongoadmin:mongoadmin@cluster0-shard-00-00.womr0.mongodb.net:27017,cluster0-shard-00-01.womr0.mongodb.net:27017,cluster0-shard-00-02.womr0.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-ftyf8w-shard-0&authSource=admin&retryWrites=true&w=majority',
  collection: 'sessions'
})

app.set('PORT', process.env.PORT || 8080);
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: ['http://localhost:3000','http://localhost:5000'], credentials : true}))

app.use(session({
  store: sessionStore,
  secret: 'password',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 600000},
  rolling: true
}))

app.use('/', router);

http.listen(app.get('PORT'), () => {
  
  return console.log(`Servidor listo en puerto ${app.get('PORT')}`);
}).on('error', ()=>console.log('El puerto configurado se encuentra en uso'));