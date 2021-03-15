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
exports.listarProductos = exports.guardarProducto = exports.actualizarProducto = exports.eliminarProducto = void 0;
const db = __importStar(require("../db/db.modules"));
function listarProductos(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let productos;
        try {
            let data = yield db.readProducts();
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
        if (!nombre || nombre === "" || !descripcion || descripcion === "" || precio === null || precio === undefined || !codigo || codigo === "" || stock === null || stock === undefined || !foto || foto === "") {
            return 'Los parametros enviados son incorrectos';
        }
        else {
            try {
                data = yield db.saveProduct(nombre, descripcion, precio, codigo, stock, foto);
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
                data = yield db.updateProduct(id, nombre, descripcion, precio, codigo, stock, foto);
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
            let data = yield db.readProducts();
            let product = data.find(element => element.id === id);
            if (!product) {
                return 'no se encontro el id indicado';
            }
            else {
                return db.deleteProduct(id);
            }
        }
        catch (err) {
            return err;
        }
    });
}
exports.eliminarProducto = eliminarProducto;
//# sourceMappingURL=productos.service.js.map