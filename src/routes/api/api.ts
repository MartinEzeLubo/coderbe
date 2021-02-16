import express, { json } from 'express';
import apiProductos from './productos/productos';

let router = express.Router();

router.use('/productos', apiProductos)
router.use(express.json());






export default router;