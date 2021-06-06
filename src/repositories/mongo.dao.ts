import {producto} from '../models/producto.model.mongo'
import {mensaje} from '../models/mensaje.model.mongo'
import {dbLog} from '../models/log.model.mongo'
import {userLogin}  from '../models/user.model.mongo'


export class mongoDAO {
    
    //martinlubo.ddns.net:8102
    //mongodb://martinlubo.ddns.net:8102/ecommerce
    constructor(){
        const mongoose = require('mongoose');
        const mongoConnection= mongoose.connect('mongodb://mongoadmin:mongoadmin@cluster0-shard-00-00.womr0.mongodb.net:27017,cluster0-shard-00-01.womr0.mongodb.net:27017,cluster0-shard-00-02.womr0.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-ftyf8w-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
        .then(() => {
            console.log('se conecto correctamente');
            this.saveLogToDatabase()
        })
        .catch(error => console.log(error));
        
    }
    
    async saveLogToDatabase(){
        try {
            let data = {timestamp: Date.now()}

            let logModel = new dbLog(data);
            logModel.save();
            
        } catch (error) {
            return error
        }
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
            return err;
        }
        
    }

    async read(id?:string, name?:string, rangeFrom?:number, rangeTo?:number){
        try {
            if(!id && !name && !rangeFrom && !rangeTo){
                return await producto.find();
            }
            if(!id && !name && (rangeFrom || rangeTo)){
                if(rangeFrom && !rangeTo){
                    return await producto.find({precio: {$gt: rangeFrom, $lt: 999999999999999999999999999999}})
                } else if (!rangeFrom && rangeTo){
                    return await producto.find({precio: {$gt: 0, $lt: rangeTo}})
                } else{
                    return await producto.find({precio: {$gt: rangeFrom, $lt: rangeTo}});
                }
            }
            let data = await producto.findOne({ $or:
                [
                    {_id: id},
                    {nombre: name}
                ]})
            
            if (data === null){
                throw  Error('No existe un producto con los valores buscados');
            } 
            return data;

        } catch (err) {
            throw Error('No existe un producto con los valores buscados');
        }
    }

    async update(id: string, nombre: string, descripcion: string, precio: number, codigo: string, stock: number, foto: string){
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



    async createMessage(mail: string, name: string, lastname: string, age: number, alias: string, avatar: string, text: string){
        

        try {
            let author = {
                mail, 
                name,
                lastname,
                age,
                alias,
                avatar
            }
            let nuevoMensaje = {
                text,
                timestamp: Date.now()
            }
        
            let nuevoMensajeModel = await new mensaje(nuevoMensaje);
            nuevoMensajeModel.author = author;
            console.log(nuevoMensajeModel);
            await nuevoMensajeModel.save();
            return nuevoMensajeModel;

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



    async createUser(username: String, password:String, email?:string, firstName?:String, lastName?:String){
        try {
            let newUser = {
                username,
                password,
                email,
                firstName,
                lastName
            }
    
            let newUserModel = new userLogin(newUser);
            newUserModel.save()
            
        } catch (error) {
            
        }
        
    }
    
    async readUser(username: String){
        try {
            let data = await userLogin.findOne({username: username})
            return data;
        } catch (error) {
            
        }
        
    }
}

