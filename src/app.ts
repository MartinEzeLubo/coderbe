import "core-js";
import "regenerator-runtime/runtime";

import cors from 'cors'
import session, { Store } from 'express-session'
import express from 'express';
import router from './routes/index';
import * as database from './repositories/mongo.dao';
import passport from 'passport'
import * as passportLocal from 'passport-local';
import bCrypt from 'bcrypt'
import {user} from './models/user.model.mongo';

export const db = new database.mongoDAO;

const app = express();
const http = require('http').Server(app);
const mongoDBStore = require('connect-mongodb-session')(session)
const sessionStore = new mongoDBStore({
  uri: 'mongodb://mongoadmin:mongoadmin@cluster0-shard-00-00.womr0.mongodb.net:27017,cluster0-shard-00-01.womr0.mongodb.net:27017,cluster0-shard-00-02.womr0.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-ftyf8w-shard-0&authSource=admin&retryWrites=true&w=majority',
  collection: 'sessions'
})
let LocalStrategy = passportLocal.Strategy;

const createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}


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

app.use(passport.initialize());
app.use(passport.session());



passport.use('login', new LocalStrategy({
  passReqToCallback: true
  },
  function(req, username, password, done){
    let findOrCreateUser = function(){
      user.findOne({'username': username},
        function(err, user){
          if (err){
            console.log('Error de registracion '+err);
            return done(err)
          }
          if (user){
            console.log('El usuario ya existe');
            return done(null, false, console.log('message', 'El usuario ya existe'));
            
          } else {
            let newUser = new user();
            newUser.username = username;
            newUser.password = createHash(password);
            newUser.email = req.body.email;
            newUser.firstName = req.body.firstName;
            newUser.lastName = req.body.lastName;
  
            newUser.save(function(err){
              if (err){
                console.log('Error al guardar el usuario '+err);
                throw err;
              }
              console.log('Usuario registrado correctamente');
              return done(null, newUser)
            })
          }
  
        }
      )

    }
    process.nextTick(findOrCreateUser);
  }

))


passport.serializeUser(function(user, done){
  done(null, user._id);
});

passport.deserializeUser(function(id, done){
  user.findById(id, function(err, user){
    done(err, user);
  })
})


export function checkAuthentication(req,res,next){
  if(req.isAuthenticated()){
    
      //req.isAuthenticated() will return true if user is logged in
      next();
  } else{
      res.status(401).send()
  }
}


http.listen(app.get('PORT'), () => {
  
  return console.log(`Servidor listo en puerto ${app.get('PORT')}`);
}).on('error', ()=>console.log('El puerto configurado se encuentra en uso'));