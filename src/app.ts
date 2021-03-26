import "core-js";
import "regenerator-runtime/runtime";

import express from 'express';
import router from './routes/index';

import {mongoConnection} from './db/connections/mongo.db'


//import {crearTablas, crearChat} from './db/db.modules'
import {crearTablasMongo} from './db/operations/product_create_tables_mongo.db'



const app = express();
const http = require('http').Server(app);

app.set('PORT', process.env.PORT || 8080);
app.use(express.urlencoded({extended: true}));

app.use('/', router);

let db = mongoConnection.connection;

crearTablasMongo();

http.listen(app.get('PORT'), () => {
  
  return console.log(`Servidor listo en puerto ${app.get('PORT')}`);
}).on('error', ()=>console.log('El puerto configurado se encuentra en uso'));






