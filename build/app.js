"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("core-js");
require("regenerator-runtime/runtime");
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const db_modules_1 = require("./db/db.modules");
const app = express_1.default();
const http = require('http').Server(app);
app.set('PORT', process.env.PORT || 8080);
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/', index_1.default);
db_modules_1.crearTablas();
http.listen(app.get('PORT'), () => {
    return console.log(`Servidor listo en puerto ${app.get('PORT')}`);
}).on('error', () => console.log('El puerto configurado se encuentra en uso'));
//# sourceMappingURL=app.js.map