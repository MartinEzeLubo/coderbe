"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = void 0;
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String
});
exports.userLogin = mongoose.model('userLogin', userSchema);
//# sourceMappingURL=user.model.mongo.js.map