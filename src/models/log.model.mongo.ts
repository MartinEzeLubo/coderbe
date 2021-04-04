const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
 
    timestamp: {type: Number, required: true}
    
})

export const log = mongoose.model('log', logSchema);