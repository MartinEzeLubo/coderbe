"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConnection = void 0;
const mongoose = require('mongoose');
exports.mongoConnection = mongoose.connect('mongodb://martinlubo.ddns.net:8102/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('se conecto correctamente'))
    .catch(error => console.log(error));
module.exports = {
    mongoConnection: exports.mongoConnection
};
//# sourceMappingURL=mongo.db.js.map