import {producto} from '../models/producto.model.mongo'
import {mensaje} from '../models/mensaje.model.mongo'

export class mongoDAO {
    
    constructor(){
        const mongoose = require('mongoose');
        const mongoConnection= mongoose.connect('mongodb://martinlubo.ddns.net:8102/ecommerce', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
        .then(() => console.log('se conecto correctamente'))
        .catch(error => console.log(error));
        
    }

    
    async create(nombre: string, descripcion: string, precio: number, codigo: string, stock: number, foto: string){
        
        try {
            let nuevoProducto = {
                nombre,
                descripcion,
                precio,
                codigo,
                stock,
                foto,
                timestamp: Date.now()
            }
        
            let nuevoProductoModel = new producto(nuevoProducto);
            nuevoProductoModel.save();
            return nuevoProducto;    
        } catch (err) {
            console.log(err);
            return err;
        }
        
    }

    async read(id?:string){

        try {
            if (id){
                let data = await producto.findById(id)
                if (data === null){
                    throw  Error('No existe un producto con el ID indicado');    
                }
                return data
            }    

            return await producto.find();
        } catch (err) {
            throw Error('No existe un producto con el ID indicado');
        }
        
    }

    async update(id: string, nombre: string, descripcion: string, precio: number, codigo: string, stock: number, foto: string){
        
        let data;
        
        try {
            return await producto.findOneAndUpdate(
                {_id:id},
                {$set: {
                    nombre: nombre, 
                    descripcion: descripcion,
                    precio: precio, 
                    codigo: codigo, 
                    stock: stock, 
                    foto: foto, 
                    timestamp: Date.now()
                }},
                {new: true})
        } catch (err) {
            throw Error('No existe un producto con el ID indicado')
        }
        
    }

    async delete(id: string){
        try {
            let data = await producto.findOneAndDelete({_id: id})
            if (data === null){
                throw Error('No existe un producto con el ID indicado')
            }
            return data;
            
        } catch (err) {
            throw Error(`No existe un producto con el ID indicado`);
        }
      
    }



    async createMessage(sender: string, message: string){
        
        try {
            let nuevoMensaje = {
                sender,
                message,
                timestamp: Date.now()
            }
        
            let nuevoMensajeModel = new mensaje(nuevoMensaje);
            nuevoMensajeModel.save();
            return nuevoMensaje;

        } catch (err) {
            console.log(err);
            return err;
        }
        
    }

    async readMessage(id?:string){

        try {
            if (id){
                let data = await mensaje.findById(id)
                if (data === null){
                    throw  Error('No existe un producto con el ID indicado');    
                }
                return data
            }    

            return await mensaje.find();
        } catch (err) {
            throw Error('No existe un producto con el ID indicado');
        }
        
    }
    
}

