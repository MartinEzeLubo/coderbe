"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.chatdb = exports.db = void 0;
const CONFIG = __importStar(require("../app"));
const sqlite = __importStar(require("../repositories/sqlite.dao"));
const mongoDAO = require('../repositories/mongo.dao');
setTimeout(() => dbConfig(), 2000);
function dbConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        let dbOption = CONFIG.DB_SELECTION;
        switch (dbOption) {
            case "sqlite":
                {
                    exports.db = sqlite;
                    exports.db.crearTablaProductos();
                }
                break;
            case "mongo":
                exports.db = mongoDAO.getInstance();
                break;
            default:
                return 'Error en la configuracion de DDBB';
        }
        let ChatdbOption = CONFIG.DB_SELECTION_CHAT;
        switch (ChatdbOption) {
            case "sqlite":
                {
                    exports.chatdb = sqlite;
                    exports.chatdb.crearTablaChat();
                }
                break;
            case "mongo":
                exports.chatdb = mongoDAO.getInstance();
                break;
            default:
                return 'Error en la configuracion de DDBB';
        }
    });
}
//# sourceMappingURL=dbSelection.js.map