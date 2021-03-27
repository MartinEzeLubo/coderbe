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
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const ENV = __importStar(require("../app"));
const DBRepo = __importStar(require("./dao.modules"));
setTimeout(() => dbConfig(), 2000);
function dbConfig() {
    switch (ENV.DB_SELECTION) {
        // case 0: db = new DBRepo.mongoDAO;
        //     break
        // case 1: db = new DBRepo.fsDAO;
        //     break
        // case 2: db = new DBRepo.MySQLDAO;
        //     break
        // case 3: db = new DBRepo.MySQLDBaaSDAO;
        //     break
        // case 4: db = new DBRepo.sqliteDAO;
        //     break
        case 5:
            exports.db = new DBRepo.mongoDAO;
            break;
        // case 6: db = new DBRepo.mongoDBaaSDAO;
        //     break
        // case 7: db = new DBRepo.firebaseDAO;
        //     break
        default:
            return 'Error en la configuracion de DDBB';
    }
}
//# sourceMappingURL=dbSelection.repository.js.map