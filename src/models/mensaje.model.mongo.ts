const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    
})

const mensajeSchema = new mongoose.Schema({
    author: {
        mail: {type: String, max: 50},
        name: {type: String, max: 50},
        lastname: {type: String,  max: 50},
        age: {type: Number},
        alias: {type: String, max: 50},
        avatar: {type: String, max: 250},
    },
    text: {type: String, required: true, max: 500},
    timestamp: {type: Number, required: true}
    
})

export const mensaje = mongoose.model('mensaje', mensajeSchema);