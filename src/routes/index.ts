import express, { Router, Request } from 'express';
import routerProductos from './productos';
import routerChat from './chat';
import routerLogin from './login';


let router:Router = express.Router();


router.use(express.json());
router.use(express.urlencoded({extended: true}));


router.use('/productos', routerProductos);
router.use('/chat', routerChat);
router.use('/login', routerLogin)


router.get('/login/:user?:pass?', async (req, res) => {
    if(!req.query.user || !req.query.pass){
        res.status(401).send('Login Failed')
    } else if (req.query.user && req.query.pass){
        req.session.login = true;
        res.status(200).send(req.sessionID)
    } else {
        res.status(401).send()
    }
});


router.get('/logout',checkAuthentication, async (req, res) => {
    req.session.destroy(()=>{
        res.status(200).send();
    });
    
});


export function checkAuthentication(req,res,next){
    if(req.session.login){
            next();
    } else{
        res.status(401).send()
    }
}




router.get('/status',checkAuthentication, async (req, res, next) => { 
    
    res.status(200).send({"idSession": req.sessionID})
        
});


export default router;