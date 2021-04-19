import "core-js";
import "regenerator-runtime/runtime";

import cors from 'cors'
import session from 'express-session'
import express from 'express';
import router from './routes/index';
import * as database from './repositories/mongo.dao';

export const db = new database.mongoDAO;

const app = express();
const http = require('http').Server(app);

app.set('PORT', process.env.PORT || 8080);
app.use(express.urlencoded({extended: true}));
app.use(cors())
app.use(session({
  secret: 'asd',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60000}
}))

app.use('/', router);


http.listen(app.get('PORT'), () => {
  
  return console.log(`Servidor listo en puerto ${app.get('PORT')}`);
}).on('error', ()=>console.log('El puerto configurado se encuentra en uso'));