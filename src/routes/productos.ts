import express from 'express';
import { eliminarProducto, actualizarProducto, guardarProducto, listarProductos } from './../service/productos.service'
import { logger } from '../app'

const axios = require('axios');
const url = require('url');

let router = express.Router();


router.get('/:id?:name?:rangeFrom?:rangeTo?', async (req, res) => {
    console.log(req.query.id);



    if (req.query.id) {
        try {
            let query = `?query={product(id: "${req.query.id}"){id,nombre,descripcion,precio,codigo,stock,foto}}`
            axios.get(`http://localhost:8080/graphql/${query}`)
                .then(response => {
                    if (response instanceof Error) {
                        res.status(404).send(response.message)
                    } else {
                        res.status(200).json(response.data);
                    }
                })
        } catch (error) {
            console.log(error);
        }
    } else {
        let query = `?query={products{id,nombre,descripcion,precio,codigo,stock,foto}}`
        try {
            axios.get(`http://localhost:8080/graphql/${query}`)
                .then(response => {
                    if (response instanceof Error) {
                        res.status(404).send(response.message)
                    } else {
                        res.status(200).json(response.data);
                    }
                })
        } catch (error) {
            console.log(error);
        }

    }

    // try {
    //     let data = await listarProductos(req.query);

    //     if (data instanceof Error){
    //         logger.log('warn', 'Advertencia: No se pudo guardar el producto' );
    //         res.status(404).json(data.message)
    //     }else{
    //         logger.log('info', `Informacion: Producto consultado: ${req.query}`);
    //         res.status(200).json(data);
    //     }

    // } catch (error) {
    //     logger.log('error', 'Error: ', error);
    //     res.status(500).send('Error de la aplicacion' + error);
    // }

});

router.post('/', async (req, res) => {

    try {
        axios.post('http://localhost:8080/graphql',
            {
                query: `mutation {
            createProduct(
                nombre:"${req.body.nombre}",
                descripcion:"${req.body.descripcion}",
                precio: ${req.body.precio},
                codigo:"${req.body.codigo}",
                stock: ${req.body.stock},
                foto:"${req.body.thumbnail}",
                ){
                    id
                   nombre
                   descripcion
                   precio 
                }
        }`})
            .then(response => {
                if (response instanceof Error) {
                    res.status(404).send(response.message)
                } else {
                    res.status(200).json(response.data);
                }
            })
    } catch (error) {
        console.log(error);
    }
    // try {
    //     let data = await guardarProducto(req.body.nombre, req.body.descripcion, parseInt(req.body.precio), req.body.codigo, parseInt(req.body.stock), req.body.foto);
    //     logger.log('info', `Informacion: Producto guardado: ${data}`);
    //     res.status(201).json(data)
    // } catch (error) {
    //     logger.log('error', 'Error: ', error);
    //     res.status(400).send('Error: ' + error);
    // }
});

router.put('/', async (req, res) => {
    try {
        let data = await actualizarProducto(req.body.id, req.body.nombre, req.body.descripcion, parseInt(req.body.precio), req.body.codigo, parseInt(req.body.stock), req.body.foto);
        if (data instanceof Error) {
            logger.log('warn', 'Advertencia: No se pudo actualizar el producto');

            res.status(404).json(data.message)
        } else {
            logger.log('info', `Informacion: Producto actualizado: ${req.body.id}`);
            res.status(202).json(data);
        }
    } catch (error) {
        logger.log('error', 'Error: ', error);
        res.send('Error de la aplicacion').status(500);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let data = await eliminarProducto(req.params.id)
        if (data instanceof Error) {
            logger.log('warn', 'Advertencia: No se pudo eliminar el producto');
            res.status(404).json(data.message)
        } else {
            logger.log('info', `Informacion: Producto eliminado: ${req.body.id}`);
            res.status(200).json(data);
        }
    } catch (error) {
        logger.log('error', 'Error: ', error);
        res.send('Error de la aplicacion' + error).status(500);
    }
});


export default router;






