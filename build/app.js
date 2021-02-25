"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProducList = void 0;
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./routes/api/api"));
const web_1 = __importDefault(require("./routes/web/web"));
const productCRUD_1 = require("./archivos/productCRUD");
const chatLog_1 = require("./archivos/chatLog");
const app = express_1.default();
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set('PORT', process.env.PORT || 8080);
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(__dirname + '/public'));
app.use('/api', api_1.default);
app.use('/', web_1.default);
io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
    updateProducList();
    updateChat();
    socket.on('newproduct', (data) => __awaiter(void 0, void 0, void 0, function* () {
        updateProducList();
    }));
    socket.on('sendmessage', (data) => {
        chatLog_1.writeMessage(data.sender, data.message, data.date);
        socket.broadcast.emit('newmessage', data);
    });
    socket.on('writing', (data) => {
        socket.broadcast.emit('whoiswriting', data);
    });
}));
function updateProducList() {
    return __awaiter(this, void 0, void 0, function* () {
        let list = yield productCRUD_1.listProducts();
        io.sockets.emit('productlist', list);
    });
}
exports.updateProducList = updateProducList;
;
function updateChat() {
    return __awaiter(this, void 0, void 0, function* () {
        let chat = yield chatLog_1.listChat();
        io.sockets.emit('chat', chat);
    });
}
http.listen(app.get('PORT'), () => {
    return console.log(`Servidor listo en puerto ${app.get('PORT')}`);
}).on('error', () => console.log('El puerto configurado se encuentra en uso'));
module.exports = { updateProducList };
// async function getProducts() {
//   let data = await listProducts();
//   return data;
// }
//# sourceMappingURL=app.js.map