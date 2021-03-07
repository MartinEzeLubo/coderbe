import express from 'express';
import {eliminarProducto, actualizarProducto, guardarProducto, listarProductos} from './../service/productos.service'

let router = express.Router();


router.get('/', async (req, res) => {
    let products = await listarProductos();
    res.json(products);
});

router.get('/:id', async (req, res) => {
    try {
        let products = await listarProductos();
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
    try {
        let data = await guardarProducto(req.body.nombre, req.body.descripcion ,parseInt(req.body.precio), req.body.codigo, parseInt(req.body.stock) ,req.body.foto);
        res.json(data)
    } catch (error) { 
        res.status(500).send('Error de la aplicacion' + error);
    }
});

router.put('/', async (req, res) => {
    try {
        let data = await actualizarProducto(parseInt(req.body.id), req.body.nombre, req.body.descripcion ,parseInt(req.body.precio), req.body.codigo, parseInt(req.body.stock) ,req.body.foto);
        res.json(data)    
    } catch (error) { 
        res.send('Error de la aplicacion').status(500);
    }
});

router.delete('/:id', async (req, res) => {
    let data;
    try {
        data = eliminarProducto(parseInt(req.params.id))
        res.send(data)
    } catch (error) {
        res.send('Error de la aplicacion' + error).status(500);
    }
});


export default router;






