"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
require("core-js");
require("regenerator-runtime/runtime");
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const database = __importStar(require("./repositories/mongo.dao"));
exports.db = new database.mongoDAO;
const app = express_1.default();
const http = require('http').Server(app);
const mongoDBStore = require('connect-mongodb-session')(express_session_1.default);
const sessionStore = new mongoDBStore({
    uri: 'mongodb://mongoadmin:mongoadmin@cluster0-shard-00-00.womr0.mongodb.net:27017,cluster0-shard-00-01.womr0.mongodb.net:27017,cluster0-shard-00-02.womr0.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-ftyf8w-shard-0&authSource=admin&retryWrites=true&w=majority',
    collection: 'sessions'
});
app.set('PORT', process.env.PORT || 8080);
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_1.default());
//{origin: ['http://localhost:3000','http://localhost:5000','http://localhost:8080'], credentials : true}
app.use(express_session_1.default({
    store: sessionStore,
    secret: 'password',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 600000, sameSite: 'none' },
    rolling: true
}));
app.use('/', index_1.default);
http.listen(app.get('PORT'), () => {
    return console.log(`Servidor listo en puerto ${app.get('PORT')}`);
}).on('error', () => console.log('El puerto configurado se encuentra en uso'));
//# sourceMappingURL=app.js.map