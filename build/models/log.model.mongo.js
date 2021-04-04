"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbLog = void 0;
const mongoose = require('mongoose');
const logSchema = new mongoose.Schema({
    timestamp: { type: Number, required: true }
});
exports.dbLog = mongoose.model('dbLog', logSchema);
//# sourceMappingURL=log.model.mongo.js.map