"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("core-js");
require("regenerator-runtime/runtime");
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const mongo_db_1 = require("./db/connections/mongo.db");
//import {crearTablas, crearChat} from './db/db.modules'
const product_create_tables_mongo_db_1 = require("./db/operations/product_create_tables_mongo.db");
const app = express_1.default();
const http = require('http').Server(app);
app.set('PORT', process.env.PORT || 8080);
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/', index_1.default);
let db = mongo_db_1.mongoConnection.connection;
product_create_tables_mongo_db_1.crearTablasMongo();
http.listen(app.get('PORT'), () => {
    return console.log(`Servidor listo en puerto ${app.get('PORT')}`);
}).on('error', () => console.log('El puerto configurado se encuentra en uso'));
//# sourceMappingURL=app.js.map