import express, { Router } from 'express';
import routerProductos from './productos';
import routerChat from './chat';


let router:Router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.use('/productos', routerProductos);
router.use('/chat', routerChat);


export default router;