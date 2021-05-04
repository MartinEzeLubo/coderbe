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
import {fork} from 'child_process'
import numCPUs from 'os'

const cpus = numCPUs.cpus().length;
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


router.get('/info', (req, res)=>{
    let data = {
        args: process.argv,
        plataform: process.platform,
        nodeversion: process.version,
        memory: process.memoryUsage(),
        path: process.argv[0],
        process: process.pid,
        execPath: process.argv[1],
        nroCores: cpus
    }
    res.send(data)

})

router.get('/randoms/:cant?', (req, res)=>{

    let randomProcess = fork('./dist/utils/randomNumbers.js');
    if(req.params.cant){
        randomProcess.send(req.params.cant)
    } else {
        randomProcess.send(100000000)
    }
    randomProcess.on('message', data => {
        res.send(data)
    })
    
})


router.get('/status', checkAuthentication, async (req, res, next) => { 
    
    res.status(200).send({"idSession": req.sessionID})
        
});



passport.use(new FacebookStrategy({
    clientID: process.argv[2] || "178865330778385",
    clientSecret: process.argv[3] || 'd8ea15cb8e904fef12b5bd6d8c87d4e1',
    callbackURL: "http://localhost:8080/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'emails'],
    scope: ['email']
    },
    function(accessToken, refreshToken, profile, done){
        console.log(profile.displayName);
        done(null, profile.displayName);
    }
    
))  


router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: `/login`}),
 (req, res) => {
    req.query.login = "true";
    res.redirect("http://localhost:3000/")
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



