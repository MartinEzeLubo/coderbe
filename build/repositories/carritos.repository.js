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
exports.deleteProductFromCarrito = exports.addProductToCarrito = exports.readCarritos = exports.createCarrito = void 0;
const productos_service_1 = require("./../service/productos.service");
const fs = require('fs');
const fileName = 'carritosDDBB';
function readCarritos() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let contenido = yield fs.promises.readFile(`${__dirname}/${fileName}.txt`, 'utf-8');
            return JSON.parse(contenido);
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.readCarritos = readCarritos;
function createCarrito() {
    return __awaiter(this, void 0, void 0, function* () {
        let info;
        try {
            let data = yield fs.promises.readFile(`${__dirname}/${fileName}.txt`, 'utf-8');
            info = JSON.parse(data);
            let id = info.length + 1;
            let carrito = { 'id': id,
                'timestamp': Date.now(),
                'productos': []
            };
            info.push(carrito);
            yield fs.promises.writeFile(`${__dirname}/${fileName}.txt`, JSON.stringify(info, null, 4));
            return carrito;
        }
        catch (err) {
            console.log(err);
            return err;
        }
    });
}
exports.createCarrito = createCarrito;
function addProductToCarrito(idCarrito, idProducto) {
    return __awaiter(this, void 0, void 0, function* () {
        let producto = yield productos_service_1.listarProductos(idProducto);
        try {
            let data = yield readCarritos();
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === idCarrito) {
                    data[i].productos.push(producto);
                    break;
                }
            }
            yield fs.promises.writeFile(`${__dirname}/${fileName}.txt`, JSON.stringify(data, null, 4));
            return 'producto agregado';
        }
        catch (err) {
            throw err;
        }
    });
}
exports.addProductToCarrito = addProductToCarrito;
function deleteProductFromCarrito(idCarrito, idProducto) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = yield readCarritos();
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === idCarrito) {
                    for (let x = 0; x < data[i].productos.length; x++) {
                        if (data[i].productos[x].id === idProducto)
                            console.log(JSON.stringify(data[i].productos[x]));
                        data[i].productos[x].splice(x - 1, 1);
                        break;
                    }
                }
            }
            yield fs.promises.writeFile(`${__dirname}/${fileName}.txt`, JSON.stringify(data, null, 4));
            return 'producto eliminado';
        }
        catch (err) {
            throw err;
        }
    });
}
exports.deleteProductFromCarrito = deleteProductFromCarrito;
//# sourceMappingURL=carritos.repository.js.map