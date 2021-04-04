"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const mongoose = require('mongoose');
const logSchema = new mongoose.Schema({
    timestamp: { type: Number, required: true }
});
exports.log = mongoose.model('log', logSchema);
//# sourceMappingURL=log.model.mongo.js.map