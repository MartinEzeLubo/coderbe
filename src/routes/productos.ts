import express from 'express';
import {eliminarProducto, actualizarProducto, guardarProducto, listarProductos} from './../service/productos.service'

let router = express.Router();


router.get('/:id?:name?:rangeFrom?:rangeTo?', async (req, res) => {
    try {
        let data = await listarProductos(req.query);
        
        if (data instanceof Error){
            res.status(404).json(data.message)
        }else{
            res.status(200).json(data);
        }
        
    } catch (error) {
        res.status(500).send('Error de la aplicacion' + error);
    }
    });

router.post('/', async (req, res) => {
    try {
        let data = await guardarProducto(req.body.nombre, req.body.descripcion ,parseInt(req.body.precio), req.body.codigo, parseInt(req.body.stock) ,req.body.foto);
        res.status(201).json(data)
    } catch (error) { 
        res.status(500).send('Error de la aplicacion' + error);
    }
});

router.put('/', async (req, res) => {
    try {
        let data = await actualizarProducto(req.body.id, req.body.nombre, req.body.descripcion ,parseInt(req.body.precio), req.body.codigo, parseInt(req.body.stock) ,req.body.foto);
        if (data instanceof Error){
            res.status(404).json(data.message)
        }else{
            res.status(202).json(data);
        }
    } catch (error) { 
        res.send('Error de la aplicacion').status(500);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let data = await eliminarProducto(req.params.id)
        if (data instanceof Error){
            res.status(404).json(data.message)
        }else{
            res.status(200).json(data);
        }
    } catch (error) {
        res.send('Error de la aplicacion' + error).status(500);
    }
});


export default router;






