import express, { Router } from 'express';
import routerProductos from './productos';
import routerCarritos from './carritos';
import routerChat from './chat';


let router:Router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.use('/productos', routerProductos);
router.use('/carritos', routerCarritos);
router.use('/chat', routerChat);


export default router;