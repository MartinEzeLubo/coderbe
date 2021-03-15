"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearChat = void 0;
const sqlite3_db_1 = require("../connections/sqlite3.db");
function crearChat() {
    sqlite3_db_1.knexSQLite3.schema.hasTable('chat').then(exists => {
        if (!exists) {
            let info = sqlite3_db_1.knexSQLite3.schema.createTable('chat', table => {
                table.increments('id').primary();
                table.string('sender', 80);
                table.string('message', 200);
                table.string('timestamp');
            })
                .then(() => console.log('tabla chat creada'))
                .catch((err) => console.log(err))
                .finally(() => sqlite3_db_1.knexSQLite3.destroy);
            sqlite3_db_1.knexSQLite3('chat')
                .insert([
                {
                    "sender": "asd@asd.com",
                    "message": "Buenas noches",
                    "timestamp": "1615761918128"
                },
                {
                    "sender": "asd@asd.com",
                    "message": "como va todo?",
                    "timestamp": "1615761918128"
                },
                {
                    "sender": "asd@asd.com",
                    "message": "jajaja",
                    "timestamp": "1615761918128"
                },
                {
                    "sender": "asd@asd.com",
                    "message": "Otra vez sopa",
                    "timestamp": "1615761918128"
                }
            ]).then(() => console.log('Chat insertado'))
                .catch((err) => console.log(err))
                .finally(() => sqlite3_db_1.knexSQLite3.destroy);
        }
        else {
            console.log('la tabla de chat ya existe');
        }
    });
}
exports.crearChat = crearChat;
module.exports = {
    crearChat
};
//# sourceMappingURL=chat_create_tables.db.js.map