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
exports.checkAuthentication = void 0;
const express_1 = __importDefault(require("express"));
const productos_1 = __importDefault(require("./productos"));
const chat_1 = __importDefault(require("./chat"));
const login_1 = __importDefault(require("./login"));
let router = express_1.default.Router();
router.use(express_1.default.json());
router.use(express_1.default.urlencoded({ extended: true }));
router.use('/productos', productos_1.default);
router.use('/chat', chat_1.default);
router.use('/login', login_1.default);
router.get('/login/:user?:pass?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.user || !req.query.pass) {
        res.status(401).send('Login Failed');
    }
    else if (req.query.user && req.query.pass) {
        req.session.login = true;
        res.status(200).send(req.sessionID);
    }
    else {
        res.status(401).send();
    }
}));
router.get('/logout', checkAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.destroy(() => {
        res.status(200).send();
    });
}));
function checkAuthentication(req, res, next) {
    if (req.session.login) {
        next();
    }
    else {
        res.status(401).send();
    }
}
exports.checkAuthentication = checkAuthentication;
router.get('/status', checkAuthentication, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send({ "idSession": req.sessionID });
}));
exports.default = router;
//# sourceMappingURL=index.js.map