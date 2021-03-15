"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knexSQLite3 = exports.connectionSQLite3 = void 0;
exports.connectionSQLite3 = {
    client: 'sqlite3',
    connection: {
        filename: "./chat.sqlite"
    }
};
exports.knexSQLite3 = require('knex')(exports.connectionSQLite3);
module.exports = {
    connectionSQLite3: exports.connectionSQLite3,
    knexSQLite3: exports.knexSQLite3
};
//# sourceMappingURL=sqlite3.db.js.map