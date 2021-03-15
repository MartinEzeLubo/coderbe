"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = exports.connectionMariaDB = void 0;
exports.connectionMariaDB = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'Maria2021!',
        database: 'backend'
    }
};
exports.knex = require('knex')(exports.connectionMariaDB);
module.exports = {
    connectionMariaDB: exports.connectionMariaDB,
    knex: exports.knex
};
//# sourceMappingURL=maria.db.js.map