const dotenv = require('dotenv')
const path = require('path');


dotenv.config({
    path: path.join(__dirname, `../${process.env.NODE_ENV}.env`)
})


module.exports = {

    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    MODE: 'fork',
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    DB_SELECTION: process.env.DB_SELECTION,
    DB_SELECTION_CHAT: process.env.DB_SELECTION_CHAT
}