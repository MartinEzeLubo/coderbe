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
exports.deleteItem = exports.updateDataFile = exports.writeDataFile = exports.readDataFile = void 0;
const archivos_1 = require("./archivos");
const dataSource = new archivos_1.Archivo('productos');
function readDataFile() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = yield dataSource.read();
            return data;
        }
        catch (err) {
            return err;
        }
    });
}
exports.readDataFile = readDataFile;
function writeDataFile(title, price, thumbnail) {
    return __awaiter(this, void 0, void 0, function* () {
        let data;
        try {
            data = yield dataSource.save(title, price, thumbnail);
        }
        catch (err) {
            return err;
        }
        return data;
    });
}
exports.writeDataFile = writeDataFile;
function updateDataFile(id, title, price, thumbnail) {
    return __awaiter(this, void 0, void 0, function* () {
        let data;
        try {
            data = yield dataSource.update(id, title, price, thumbnail);
        }
        catch (err) {
            return err;
        }
        return data;
    });
}
exports.updateDataFile = updateDataFile;
function deleteItem(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let data;
        try {
            data = yield dataSource.delete(id);
        }
        catch (err) {
            return err;
        }
        return data;
    });
}
exports.deleteItem = deleteItem;
//# sourceMappingURL=readWriteFiles.js.map