const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
 
    nombre: {type: String, required: true,  max: 50},
    descripcion: {type: String, required: true,  max: 50},
    precio: {type: Number, required: true},
    codigo: {type: String, required: true,  max: 20},
    stock: {type: Number, required: true},
    foto: {type: String, required: true,   max: 150},
    timestamp: {type: Number, required: true}
})

export const producto = mongoose.model('producto', productoSchema);