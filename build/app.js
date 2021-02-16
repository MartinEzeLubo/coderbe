"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./routes/api/api"));
const web_1 = __importDefault(require("./routes/web/web"));
const port = 8080;
const app = express_1.default();
const http = require('http').Server(app);
const socket = require('socket.io')(http);
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_1.default.static(__dirname + '/public'));
app.use('/api', api_1.default);
app.use('/', web_1.default);
http.listen(port, () => {
    return console.log(`Servidor listo en puerto ${port}`);
}).on('error', () => console.log('El puerto configurado se encuentra en uso'));
//# sourceMappingURL=app.js.map