import express, { json } from 'express';
import webProductos from './productos/productos';
import {listProducts, saveProduct} from '../../archivos/productCRUD';

let router = express.Router();


router.use('/productos', webProductos)
router.use(express.json());

router.get('/', (req, res) => {
    res.render("pages/index");

});


export default router;