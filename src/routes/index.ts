import express, { Router, Request } from 'express';
import routerProductos from './productos';
import routerChat from './chat';
import routerLogin from './login';
import passport from 'passport'
import * as passportLocal from 'passport-local';
import {user as dbuser} from '.././models/user.model.mongo';
import bCrypt from 'bcrypt'
import {db} from '../app'
import { create } from 'connect-mongo';


let router:Router = express.Router();

let LocalStrategy = passportLocal.Strategy;

const createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
  }

  
router.use(express.json());
router.use(express.urlencoded({extended: true}));


router.use('/productos', routerProductos);
router.use('/chat', routerChat);
router.use('/login', routerLogin)
router.use(passport.initialize());
router.use(passport.session());

router.post('/login', 
    passport.authenticate('login', { failureRedirect: '/login' }),
    function(req, res) {
        console.log(req.session.passport);
        
    res.send(req.session.passport.user);
});




router.get('/logout', async (req, res) => {
    req.session.destroy(()=>{
        res.status(200).send();
    });
    
});





export function checkAuthentication(req,res,next){
    if(req.session.login){
        console.log('auth ok');
            next();
    } else{
        res.status(401).send()
    }
}




router.get('/status', checkAuthentication, async (req, res, next) => { 
    
    res.status(200).send({"idSession": req.sessionID})
        
});



passport.use('login', new LocalStrategy({
    passReqToCallback: true
    },
    async function(req, username, password, done){
        try{
            let data = await db.readUser(username)    
            if(bCrypt.compareSync(password, data.password)){
                data.password = ''
                done(null, data);
            }
            

        }
        catch{

        }
    }
))  


passport.use('register', new LocalStrategy({
    passReqToCallback: true
    },
    async function(req, username, password, done){
        if (username && password){
            try{
                let userExist = await db.readUser(username)
                if (userExist){
                    return done (null, 'El usuario ya existe',)
                }
                let newUser = { username: username,
                                password: createHash(password),
                                firstName:req.body.firstName,
                                lastName:req.body.lastName     
                            }
                let newUserModel = new dbuser(newUser)
                newUserModel.save(err=>{
                    if(err){
                    console.log('Error al guardar usuario: '+err);  
                    throw err; 
                    }
                    console.log('Usuario registrado correctamente');    
                    return done(null, newUser);    
                })                 
            }
            catch{
    
            }

        }
    }
)) 
  
passport.serializeUser(function(user, done){
    done(null, user);
});
  
passport.deserializeUser(function(id, done){
    // user.findById(id, function(err, user){
    done(null, {username: 'martin', id: 'asdasdasd'});
    // })
})
  





export default router;










// let newUser = new user();
//               newUser.username = username;
//               newUser.password = createHash(password);
//               newUser.email = req.body.email;
//               newUser.firstName = req.body.firstName;findOrCreateUser



// router.post('/login/:user?:pass?', async (req, res) => {
//     if(!req.query.user || !req.query.pass){
//         res.status(401).send('Login Failed')
//     } else if (req.query.user && req.query.pass){
//         req.session.login = true;
//         res.status(200).send(req.sessionID)
//     } else {
//         res.status(401).send()
//     }
// });