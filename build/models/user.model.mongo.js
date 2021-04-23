"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String
});
exports.user = mongoose.model('user', userSchema);
//# sourceMappingURL=user.model.mongo.js.map