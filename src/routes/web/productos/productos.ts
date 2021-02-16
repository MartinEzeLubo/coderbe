import express from 'express';
import {listProducts, saveProduct} from '../../../archivos/productCRUD';
import {socket} from '../../../app';

let router = express.Router();


router.get('/alta', async (req, res) => {
    let products = await listProducts();
    res.render("pages/index", {info: products});
});
router.post('/alta', async (req, res) => {
    if((!req.body.title || req.body.title === "" || req.body.price === null || req.body.price === undefined || !req.body.thumbnail || req.body.thumbnail === "") ){
        res.status(400).send('Los parametros enviados son incorrectos');
    } else {
        await saveProduct(req.body.title, parseInt(req.body.price), req.body.thumbnail);
        res.redirect('/productos/alta')
        try {
        } catch (error) { 
        res.status(500).send('Error de la aplicacion' + error);
        }
    }
});

router.get('/vista', async (req, res) => {
    let products = await listProducts();
    res.render("pages/indexListado", {info: products});
});




export default router;