const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
 
    timestamp: {type: Number, required: true}
    
})

export const dbLog = mongoose.model('dbLog', logSchema);