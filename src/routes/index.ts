import express, { Router, Request } from 'express';
import routerProductos from './productos';
import routerChat from './chat';
import routerLogin from './login';
import passport from 'passport';
import passportFacebook from 'passport-facebook';
import * as passportLocal from 'passport-local';
import {user as dbuser, user} from '.././models/user.model.mongo';
import bCrypt from 'bcrypt'
import {db} from '../app'



let router:Router = express.Router();

let LocalStrategy = passportLocal.Strategy;
let FacebookStrategy = passportFacebook.Strategy;


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
    passport.authenticate('login', {failureRedirect: '/login' }),
    function(req, res) {
        res.status(200).send(req.user);
    }
);

router.post('/register', 
    passport.authenticate('register', {}),
    function(req, res) {
        res.status(200).send(req.user);
    }
);



router.get('/logout', async (req, res) => {
    req.logout();
    req.session.destroy(()=>{
        res.status(200).send();
    });
    
});





export function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
            next();
    } else{
        res.status(401).send()
    }
}




router.get('/status', checkAuthentication, async (req, res, next) => { 
    
    res.status(200).send({"idSession": req.sessionID})
        
});



passport.use(new FacebookStrategy({
    clientID: '731600997521444',
    clientSecret: '8c3ef7d0c85aa25009300ae162bff178',
    callbackURL: "http://localhost:8080/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'emails'],
    scope: ['email']
    },
    function(accessToken, refreshToken, profile, done){
        done(null, profile.displayName);
    }
    
))  


router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {successRedirect: 'http://localhost:3000/', failureRedirect: `/login`}),
 (req, res) => {
     console.log('asdasd');
    
  }) ;



passport.use('register', new LocalStrategy({
    passReqToCallback: true
    },
    async function(req, username, password, done){
        
        if (username && password){
            try{
                let userExist = await db.readUser(username)
                if (userExist){
                    let error = "El usuario ya existe"
                    return done (error, false)
                }
                let newUser = { username: username,
                                password: createHash(password),
                                firstName:req.body.firstName,
                                lastName:req.body.lastName     
                            }
                let newUserModel = new dbuser(newUser)
                newUserModel.save(err=>{
                    if(err){
                    throw err; 
                    }
                    return done(null, newUser.username);    
                })                 
            }
            catch{
    
            }

        }
    }
)) 
  
passport.serializeUser(function(username, done){
    done(null, username);
});
  
passport.deserializeUser(function(id, done){
    let data = dbuser.findById(id, function(err, user){
        done(null, data);
    })
})
  





export default router;



