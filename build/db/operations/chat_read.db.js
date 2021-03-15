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
exports.writeMessage = exports.listChat = void 0;
const sqlite3_db_1 = require("../connections/sqlite3.db");
function listChat() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sqlite3_db_1.knexSQLite3.select('*').from('chat')
                .then(data => {
                console.log(data);
            });
        }
        catch (err) {
            return err;
        }
    });
}
exports.listChat = listChat;
function writeMessage(sender, message, date) {
    return __awaiter(this, void 0, void 0, function* () {
        let data;
        try {
        }
        catch (err) {
            return err;
        }
    });
}
exports.writeMessage = writeMessage;
//# sourceMappingURL=chat_read.db.js.map