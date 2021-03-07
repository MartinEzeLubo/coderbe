import express from 'express';

let router = express.Router();


router.get('/:id?', async(req, res) =>{
    res.send('get carritos')

})
router.patch('/:id_producto', async(req, res) =>{
    res.send('patch carritos')

})
router.delete('/:id_producto', async(req, res) =>{
    res.send('delete carrtios')

})


export default router