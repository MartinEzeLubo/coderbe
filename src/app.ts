import "core-js";
import "regenerator-runtime/runtime";

import express from 'express';
import router from './routes/index';
import {saveLogToDatabase} from './service/conectionLog.service'

export const DB_SELECTION: number = 5;


const app = express();
const http = require('http').Server(app);

app.set('PORT', process.env.PORT || 8080);
app.use(express.urlencoded({extended: true}));

app.use('/', router);


setTimeout(saveLogToDatabase, 2000);



http.listen(app.get('PORT'), () => {
  
  return console.log(`Servidor listo en puerto ${app.get('PORT')}`);
}).on('error', ()=>console.log('El puerto configurado se encuentra en uso'));






