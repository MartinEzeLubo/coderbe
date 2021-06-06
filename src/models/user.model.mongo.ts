const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String
})

export const userLogin = mongoose.model('userLogin', userSchema);