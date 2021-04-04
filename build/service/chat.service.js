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
Object.defineProperty(exports, "__esModule", { value: true });
exports.guardarMensaje = exports.listarMensaje = void 0;
const app_1 = require("../app");
function listarMensaje(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield app_1.db.readMessage(id);
        }
        catch (error) {
            return error;
        }
    });
}
exports.listarMensaje = listarMensaje;
function guardarMensaje(sender, message) {
    return __awaiter(this, void 0, void 0, function* () {
        let data;
        if (!sender || sender === "" || !message || message === "") {
            return 'Los parametros enviados son incorrectos';
        }
        try {
            data = yield app_1.db.createMessage(sender, message);
            return data;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.guardarMensaje = guardarMensaje;
//# sourceMappingURL=chat.service.js.map