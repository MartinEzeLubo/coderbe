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
exports.logDAO = void 0;
const log_model_mongo_1 = require("../models/log.model.mongo");
class logDAO {
    constructor() {
        const mongoose = require('mongoose');
        const mongoConnection = mongoose.connect('mongodb://martinlubo.ddns.net:8102/conectionlogs', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
            .then(() => console.log('Log corriendo'))
            .catch(error => console.log(error));
    }
    saveLog() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = Date.now();
                let nuevoLogModel = new log_model_mongo_1.log(data);
                nuevoLogModel.save();
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
}
exports.logDAO = logDAO;
//# sourceMappingURL=log.dao.js.map