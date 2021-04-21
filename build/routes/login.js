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
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
router.get('/:user?:pass?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query.user);
    console.log(req.query.pass);
    if (!req.query.user || !req.query.pass) {
        res.status(401).send('Login Failed');
    }
    else if (req.query.user && req.query.pass) {
        req.session.login = true;
        res.status(200).json({ mensaje: `Bienvenido ${req.query.user}`, idSession: req.sessionID }).send();
    }
    else {
        res.status(401).send();
    }
}));
router.get('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.destroy;
    res.status(200).send();
}));
router.get('/logueado', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.session.login);
    if (req.session.login) {
        res.status(200).send('estas logueado correctamente');
    }
    else {
        res.status(401).send('No estas logueado, por favor inicia sesion');
    }
}));
exports.default = router;
//# sourceMappingURL=login.js.map