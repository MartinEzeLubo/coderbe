import {producto} from '../models/producto.model.mongo'


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
        } catch (error) {
            return error;
        }
        
    }

    async read(id?:number){

        try {
            if (id){
                return  await producto.findById(id)
            }    
            return await producto.find();
        } catch (error) {
            return ('No existe un producto con el ID indicado');
        }
        
    }
    async update(id: number, nombre: string, descripcion: string, precio: number, codigo: string, stock: number, foto: string){
        
        let data;

        try {
            data = producto.findOneAndUpdate(
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
                {new: true},
                (err, doc)=>{
                    if(err){
                        return err;
                    }
                return doc;
                }
            )
            return data;
        } catch (error) {
            return error;
        }
        
    }

    async delete(id: string){
        let data;

        try {
            console.log(id);

            data = producto.findOneAndDelete(
                {_id: id},
                (err, doc)=>{
                    if(err){
                        return err;
                    }
                console.log(doc);
                return doc;

                }
            )
        return data;
        } catch (error) {
            return error;
        }
      
    }
}

