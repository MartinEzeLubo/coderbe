import express, { json } from 'express';
import webProductos from './productos/productos';
import {listProducts, saveProduct} from '../../archivos/productCRUD';

let router = express.Router();

router.use('/productos', webProductos)
router.use(express.json());




router.get('/', async (req, res) => {
    let products = await listProducts();
    res.render("pages/index", products);
});


export default router;