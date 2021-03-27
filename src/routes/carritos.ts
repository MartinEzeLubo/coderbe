import express from 'express';
import {createCarrito, readCarritos, addProductToCarrito, deleteProductFromCarrito} from './../repositories/carritos.repository'

let router = express.Router();


router.get('/:id?', async(req, res) =>{
    
    try{
        let data = await readCarritos()
        console.log(data);
        res.send(data)

    } catch(err){
        res.send(err);
    }


})

router.post('/:idCarrito&:idProducto', async(req, res) =>{
    
    try{
        let data = await addProductToCarrito(parseInt(req.params.idCarrito), req.params.idProducto);
        res.send(data)
        
    }catch(err){
        res.send(err)
    }

})
router.delete('/:idCarrito&:idProducto', async(req, res) =>{
    
    try{
        let data = await deleteProductFromCarrito(parseInt(req.params.idCarrito), parseInt(req.params.idProducto));
        res.send(data)
        
    }catch(err){
        res.send(err)
    }

})


export default router