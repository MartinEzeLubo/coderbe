import express, { json } from 'express';
import {listProducts, saveProduct, updateProduct, deleteProduct} from '../../../archivos/productCRUD';

let router = express.Router();



router.get('/', async (req, res) => {
    let products = await listProducts();
    res.json(products);
});

router.get('/:id', async (req, res) => {
    try {
        let products = await listProducts();
        let product = products.find(element => element.id === parseInt(req.params.id));
        if (!product){
        res.status(404).json({error: 'Producto no encontrado'})
        } else {
        res.json({'item': product});
        }
    } catch (error) {
        res.send('Error de la aplicacion' + error).status(500);
    }
    });

router.post('/', async (req, res) => {
    if((!req.body.title || req.body.title === "" || req.body.price === null || req.body.price === undefined || !req.body.thumbnail || req.body.thumbnail === "") ){
        res.status(400).send('Los parametros enviados son incorrectos');
    } else {
        let data = await saveProduct(req.body.title, parseInt(req.body.price), req.body.thumbnail);
        res.json(data)
        try {
        } catch (error) { 
        res.status(500).send('Error de la aplicacion' + error);
        }
    }
});

router.put('/', async (req, res) => {
    if((!req.body.id || req.body.id === null || !req.body.title || req.body.title === "" || req.body.price === null || req.body.price === undefined || !req.body.thumbnail || req.body.thumbnail === "") ){
        res.status(400).send('Los parametros enviados son incorrectos');
    } else {
        try {
        let data = await updateProduct(parseInt(req.body.id), req.body.title, parseInt(req.body.price), req.body.thumbnail);
        res.json(data)    
        } catch (error) { 
        res.send('Error de la aplicacion').status(500);
        }
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let products = await listProducts();
        let product = products.find(element => element.id === parseInt(req.params.id));
        if (!product){
        res.status(404).json({error: 'Producto no encontrado'})
        } else {
        let eliminar = await deleteProduct(parseInt(req.params.id));
        res.status(200).json(eliminar);
        }
    } catch (error) {
        res.send('Error de la aplicacion' + error).status(500);
    }
});








export default router;