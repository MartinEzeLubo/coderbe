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
exports.listarProductosGraphQL = exports.listarProductos = exports.guardarProducto = exports.actualizarProducto = exports.eliminarProducto = void 0;
const app_1 = require("../app");
function listarProductos(req) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.id || req.toString();
        let name = req.name || null;
        let rangeFrom;
        let rangeTo;
        console.log("id: " + id);
        if (req.rangeFrom) {
            rangeFrom = parseInt(req.rangeFrom);
        }
        ;
        if (req.rangeTo) {
            rangeTo = parseInt(req.rangeTo);
        }
        try {
            return yield app_1.db.read(id, name, rangeFrom, rangeTo);
        }
        catch (error) {
            return error;
        }
    });
}
exports.listarProductos = listarProductos;
function listarProductosGraphQL() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield app_1.db.read();
        }
        catch (error) {
            return error;
        }
    });
}
exports.listarProductosGraphQL = listarProductosGraphQL;
function guardarProducto(nombre, descripcion, precio, codigo, stock, foto) {
    return __awaiter(this, void 0, void 0, function* () {
        let data;
        if (!nombre || nombre === "" || !descripcion || descripcion === "" || precio === null || precio === undefined || !codigo || codigo === "" || stock === null || stock === undefined || !foto || foto === "") {
            let err = 'Los parametros enviados son incorrectos';
            throw err;
        }
        try {
            data = yield app_1.db.create(nombre, descripcion, precio, codigo, stock, foto);
            return data;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.guardarProducto = guardarProducto;
function actualizarProducto(id, nombre, descripcion, precio, codigo, stock, foto) {
    return __awaiter(this, void 0, void 0, function* () {
        let data;
        if (id === null || id === undefined || !nombre || nombre === "" || !descripcion || descripcion === "" || precio === null || precio === undefined || !codigo || codigo === "" || stock === null || stock === undefined || !foto || foto === "") {
            return 'Los parametros enviados son incorrectos';
        }
        try {
            return yield app_1.db.update(id, nombre, descripcion, precio, codigo, stock, foto);
        }
        catch (err) {
            return err;
        }
    });
}
exports.actualizarProducto = actualizarProducto;
function eliminarProducto(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield app_1.db.delete(id);
        }
        catch (error) {
            return error;
        }
    });
}
exports.eliminarProducto = eliminarProducto;
//# sourceMappingURL=productos.service.js.map