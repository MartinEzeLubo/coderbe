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
const normalizr_1 = require("normalizr");
let userSchema = new normalizr_1.schema.Entity('author', {}, { idAttribute: 'mail' });
let messageSchema = new normalizr_1.schema.Entity('messages', {
    author: userSchema,
}, {
    idAttribute: '_id'
});
let chatSchema = new normalizr_1.schema.Entity('chat', [messageSchema]);
// function normalizarInfo(data){
//   console.log(data);
//   let normalizedData = normalize(messageSchema, data);
//   console.log(normalizedData);
//   return normalizedData;
// }
function listarMensaje(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let mensajes = yield app_1.db.readMessage(id);
            return mensajes;
        }
        catch (error) {
            return error;
        }
    });
}
exports.listarMensaje = listarMensaje;
function guardarMensaje(data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!data.mail || data.mail === "" || !data.text || data.text === "") {
            return 'Los parametros enviados son incorrectos';
        }
        try {
            data = yield app_1.db.createMessage(data.mail, data.name, data.lastname, data.age, data.alias, data.avatar, data.text);
            return data;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.guardarMensaje = guardarMensaje;
//# sourceMappingURL=chat.service.js.map