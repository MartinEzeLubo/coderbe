import express from 'express';
import {listProducts} from '../../../archivos/productCRUD';

let router = express.Router();


router.get('/alta', async (req, res) => {
    let products = await listProducts();
    res.render("pages/index", {info: products});
});

router.get('/vista', async (req, res) => {
    let products = await listProducts();
    res.render("pages/indexListado", {info: products});
});




export default router;