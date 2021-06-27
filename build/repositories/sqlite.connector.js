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
exports.SqliteConnector = void 0;
function SqliteConnector() {
    let db = null;
    function DbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connectionSQLite3 = {
                    client: 'sqlite3',
                    connection: {
                        filename: "./db.sqlite"
                    },
                    useNullAsDefault: true
                };
                let knex = require('knex')(connectionSQLite3);
                return knex;
            }
            catch (e) {
                return e;
            }
        });
    }
    function Get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (db != null) {
                    console.log(`db connection is already alive`);
                    return db;
                }
                else {
                    console.log(`getting new db connection`);
                    db = yield DbConnect();
                    return db;
                }
            }
            catch (e) {
                return e;
            }
        });
    }
    return {
        Get: Get
    };
}
exports.SqliteConnector = SqliteConnector;
module.exports = SqliteConnector();
//# sourceMappingURL=sqlite.connector.js.map