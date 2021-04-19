import express, { Router } from 'express';
import routerProductos from './productos';
import routerChat from './chat';
import routerLogin from './login';


let router:Router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.use('/productos', routerProductos);
router.use('/chat', routerChat);
router.use('/login', routerLogin);


export default router;