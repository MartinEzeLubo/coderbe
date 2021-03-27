const mongoose = require('mongoose');

const mensajeSchema = new mongoose.Schema({
 
    sender: {type: String, required: true,  max: 50},
    message: {type: String, required: true,  max: 50},
    timestamp: {type: Number, required: true}
    
})

export const mensaje = mongoose.model('mensaje', mensajeSchema);