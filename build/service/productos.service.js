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
exports.listarProductos = exports.guardarProducto = exports.actualizarProducto = exports.eliminarProducto = void 0;
const productos_repository_1 = require("../repositories/productos.repository");
function listarProductos(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let productos;
        try {
            let data = yield productos_repository_1.readProducts();
            if (id) {
                for (let i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    if (data[i].id === id) {
                        productos = data[i];
                        break;
                    }
                }
                return productos;
            }
            else {
                return data;
            }
        }
        catch (err) {
            return err;
        }
    });
}
exports.listarProductos = listarProductos;
function guardarProducto(nombre, descripcion, precio, codigo, stock, foto) {
    return __awaiter(this, void 0, void 0, function* () {
        let data;
        console.log(nombre, descripcion, precio, codigo, stock, foto);
        if (!nombre || nombre === "" || !descripcion || descripcion === "" || precio === null || precio === undefined || !codigo || codigo === "" || stock === null || stock === undefined || !foto || foto === "") {
            return 'Los parametros enviados son incorrectos';
        }
        else {
            try {
                data = yield productos_repository_1.saveProduct(nombre, descripcion, precio, codigo, stock, foto);
                return data;
            }
            catch (err) {
                return err;
            }
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
        else {
            try {
                data = yield productos_repository_1.updateProduct(id, nombre, descripcion, precio, codigo, stock, foto);
            }
            catch (err) {
                return err;
            }
            return data;
        }
    });
}
exports.actualizarProducto = actualizarProducto;
function eliminarProducto(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = yield productos_repository_1.readProducts();
            let product = data.find(element => element.id === id);
            if (!product) {
                return 'no se encontro el id indicado';
            }
            else {
                return productos_repository_1.deleteProduct(id);
            }
        }
        catch (err) {
            return err;
        }
    });
}
exports.eliminarProducto = eliminarProducto;
//# sourceMappingURL=productos.service.js.map