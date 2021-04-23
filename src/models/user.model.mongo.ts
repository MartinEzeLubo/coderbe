const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String
})

export const user = mongoose.model('user', userSchema);