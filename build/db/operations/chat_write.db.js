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
const sqlite3_db_1 = require("../connections/sqlite3.db");
function writeMessage(sender, message, date) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            sqlite3_db_1.knexSQLite3('chat')
                .insert([
                {
                    "sender": sender,
                    "message": message,
                    "timestamp": date
                }
            ])
                .then(() => console.log('Chat insertado'))
                .catch((err) => console.log(err))
                .finally(() => sqlite3_db_1.knexSQLite3.destroy);
        }
        catch (err) {
            return err;
        }
    });
}
module.exports = {
    writeMessage
};
//# sourceMappingURL=chat_write.db.js.map