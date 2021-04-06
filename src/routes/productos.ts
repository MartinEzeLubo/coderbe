import express from 'express';
import {eliminarProducto, actualizarProducto, guardarProducto, listarProductos} from './../service/productos.service'

const mockProducto = require('../generator/productos.mock')

let router = express.Router();


router.get('/vista-test:cant?', async (req, res) => {
    console.log(req.query.cant);
    let cantidad = req.query.cant || 0
    try {
        if(cantidad === 0){
            res.status(200).send('No se encuentran productos');    
        } else {
            let listadoProductos = [];
            for(let i = 0; i < cantidad; i++){
                let producto = mockProducto.get();
                listadoProductos.push(producto);
            }
            res.status(200).json(listadoProductos);
        }
    } catch (error) {
        res.status(500).send('Error de la aplicacion' + error);
    }
});



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






