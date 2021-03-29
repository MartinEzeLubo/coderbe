import express from 'express';
import {listarMensaje, guardarMensaje} from './../service/chat.service'

let router = express.Router();


router.get('/', async (req, res) => {
    
    try {
        let data = await listarMensaje();
        
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
        let data = await listarMensaje(req.params.id);
        
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
        let data = await guardarMensaje(req.body.sender, req.body.message);
        res.status(201).json(data)
    } catch (error) { 
        res.status(500).send('Error de la aplicacion' + error);
    }
});


export default router;