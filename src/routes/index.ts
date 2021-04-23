import express, { Router } from 'express';
import routerProductos from './productos';
import routerChat from './chat';


let router:Router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.use('/productos', routerProductos);
router.use('/chat', routerChat);


router.get('/login/:user?:pass?', async (req, res) => {
    if(!req.query.user || !req.query.pass){
        res.status(401).send('Login Failed')
    } else if (req.query.user && req.query.pass){
        req.session.login = true;
        res.status(200).json({idSession: req.sessionID}).send()
    } else {
        res.status(401).send()
    }
});


router.get('/logout', async (req, res) => {
    
    req.session.destroy;
    res.status(200).send();
    
});

router.get('/status', async (req, res) => { 
    
    if(req.session.login){
        res.status(200).json({idSession: req.sessionID}).send()
    } else {
        res.status(401).send('token vencido')
    }
    
});


export default router;