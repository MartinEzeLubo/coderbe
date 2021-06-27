import express from 'express';
import {listarMensajes, guardarMensaje} from './../service/chat.service'

let router = express.Router();


router.get('/', async (req, res) => {
    
    try {
        let data = await listarMensajes();
        
        if (data instanceof Error){
            res.status(404).json(data.message)
        }else{
            res.status(200).json(data);
        }
        
    } catch (error) {
        res.status(500).send('Error de la aplicacion' + error);
    }
    
});

router.get('/:id', async (req, res) => {
    try {
        let data = await listarMensajes(req.params.id);
        
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
        let data = await guardarMensaje(req.body);
        res.status(201).json(data)
    } catch (error) { 
        res.status(500).send('Error de la aplicacion' + error);
    }
});






export default router;