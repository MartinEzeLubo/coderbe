"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mensaje = void 0;
const mongoose = require('mongoose');
const mensajeSchema = new mongoose.Schema({
    sender: { type: String, required: true, max: 50 },
    message: { type: String, required: true, max: 50 },
    timestamp: { type: Number, required: true }
});
exports.mensaje = mongoose.model('mensaje', mensajeSchema);
//# sourceMappingURL=mensaje.model.js.map