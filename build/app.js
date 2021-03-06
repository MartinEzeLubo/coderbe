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
exports.updateChat = exports.updateProducList = exports.logger = void 0;
const config = require('./config');
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
require("core-js");
require("regenerator-runtime/runtime");
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const compression_1 = __importDefault(require("compression"));
const winston_1 = __importDefault(require("winston"));
const productos_service_1 = require("./service/productos.service");
const chat_service_1 = require("./service/chat.service");
const yargs = require('yargs').argv;
const cpus = os_1.default.cpus().length;
const handlebars = require('express-handlebars');
const app = express_1.default();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoDBStore = require('connect-mongodb-session')(express_session_1.default);
const sessionStore = new mongoDBStore({
    uri: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-shard-00-00.womr0.mongodb.net:27017,cluster0-shard-00-01.womr0.mongodb.net:27017,cluster0-shard-00-02.womr0.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-ftyf8w-shard-0&authSource=admin&retryWrites=true&w=majority`,
    collection: 'sessions'
});
app.use(express_1.default.static('scripts'));
app.set('PORT', yargs.port || 8080);
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_1.default({ origin: [`http://localhost:${yargs.port || 8080}`], credentials: true }));
app.use(compression_1.default());
app.engine("hbs", handlebars({
    extname: ".hbs",
    defaultLayout: 'index.hbs',
}));
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express_session_1.default({
    store: sessionStore,
    secret: 'password',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 600000 },
    rolling: true
}));
app.use('/', index_1.default);
exports.logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({ filename: 'warn.log', level: 'warn' }),
        new winston_1.default.transports.File({ filename: 'error.log', level: 'error' })
    ],
});
io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
    updateProducList();
    updateChat();
    socket.on('update', () => {
        socket.emit();
    });
    socket.on('update', (data) => __awaiter(void 0, void 0, void 0, function* () {
        updateProducList();
    }));
    socket.on('sendmessage', (data) => {
        chat_service_1.guardarMensaje(data);
        socket.broadcast.emit('newmessage', data);
    });
    socket.on('writing', (data) => {
        socket.broadcast.emit('whoiswriting', data);
    });
}));
function updateProducList() {
    return __awaiter(this, void 0, void 0, function* () {
        let list = yield productos_service_1.listarProductos('');
        io.sockets.emit('productos', list);
    });
}
exports.updateProducList = updateProducList;
;
function updateChat() {
    return __awaiter(this, void 0, void 0, function* () {
        let chat = yield chat_service_1.listarMensajes();
        console.log('updateChat');
        io.sockets.emit('chat', chat);
    });
}
exports.updateChat = updateChat;
if (config.MODE === "cluster") {
    if (cluster_1.default.isMaster) {
        console.log('Trabajando modo Cluster');
        console.log(`Master ${process.pid} is running`);
        for (let i = 0; i < cpus; i++) {
            cluster_1.default.fork();
        }
        cluster_1.default.on('exit', (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} died`);
        });
    }
    else {
        http.listen(app.get('PORT'), () => {
            return console.log(`Servidor listo en puerto ${app.get('PORT')}`);
        }).on('error', () => console.log('El puerto configurado se encuentra en uso'));
        console.log(`Worker ${process.pid} started`);
    }
}
else {
    http.listen(app.get('PORT'), () => {
        console.log('Trabajando modo Fork');
        return console.log(`Servidor listo en puerto ${app.get('PORT')}`);
    }).on('error', () => console.log('El puerto configurado se encuentra en uso'));
}
//# sourceMappingURL=app.js.map