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
const database = __importStar(require("../repositories/dbSelection.repository"));
function listarProductos(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let producto;
        console.log('productos.service ' + id);
        try {
            if (id) {
                producto = yield database.db.read(id);
                return producto;
            }
            else {
                producto = yield database.db.read();
                return producto;
            }
        }
        catch (err) {
            return err;
        }
        return [];
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
                data = yield database.db.create(nombre, descripcion, precio, codigo, stock, foto);
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
                data = yield database.db.update(id, nombre, descripcion, precio, codigo, stock, foto);
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
            let data = yield database.db.read();
            let product = data.find(element => element.id === id);
            if (!product) {
                return 'no se encontro el id indicado';
            }
            else {
                return database.db.delete(id);
            }
        }
        catch (err) {
            return err;
        }
    });
}
exports.eliminarProducto = eliminarProducto;
//# sourceMappingURL=productos.service.js.map