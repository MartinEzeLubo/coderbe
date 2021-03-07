import express, { Router } from 'express';
import routerProductos from './productos';
import routerCarritos from './carritos';


let router:Router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.use('/productos', routerProductos);
router.use('/carritos', routerCarritos);


export default router;