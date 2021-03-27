import { Mongoose } from 'mongoose';
import { mongoConnection } from '../db/connections/mongo.db';
import {producto} from '../models/producto.model.mongo'


export class mongoDAO {
    
    constructor(){
        const mongoose = require('mongoose');
        const mongoConnection= mongoose.connect('mongodb://martinlubo.ddns.net:8102/ecommerce', {useNewUrlParser: true, useUnifiedTopology: true})
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
        console.log(id);
        try {
            if (id){
                let data = await producto.findOne({_id: id})
                
                console.log(data);
                return data;
            } else {
                let data = await producto.find();
                return data;
            }
        } catch (error) {
            return error;
        }
        
    }
    async update(id: number, nombre: string, descripcion: string, precio: number, codigo: string, stock: number, foto: string){
        
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
    async delete(){
        
    }

}