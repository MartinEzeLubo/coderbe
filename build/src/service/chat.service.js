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
const util = require('util');
let userSchema = new normalizr_1.schema.Entity('user', {}, { idAttribute: 'mail' });
let mensajesSchema = new normalizr_1.schema.Entity('mensajes', {
    author: userSchema
}, { idAttribute: '_id' });
let chatSchema = new normalizr_1.schema.Entity('chat', {
    mensajes: [mensajesSchema]
});
function listarMensaje(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let messagesData = yield app_1.db.readMessage(id);
            let data = { id: '001', mensajes: messagesData };
            console.log(messagesData);
            console.log(data);
            return normalizr_1.normalize(data, chatSchema);
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