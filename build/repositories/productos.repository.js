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
exports.deleteProduct = exports.updateProduct = exports.saveProduct = exports.readProducts = void 0;
const fs = require('fs');
const fileName = 'productosDDBB';
const { connection } = require('./../db/maria.db');
const knex = require('knex')(connection);
function crearTablas() {
    return __awaiter(this, void 0, void 0, function* () {
        knex.schema.hasTable('productos').then(exists => {
            if (!exists) {
                return knex.schema.createTable('productos', table => {
                    table.increments('id').primary();
                    table.string('nombre', 40);
                    table.string('Descripcion', 200);
                    table.integer('precio');
                    table.string('codigo', 40);
                    table.integer('stock');
                    table.string('foto', 200);
                    table.date('timestamp');
                })
                    .then(() => console.log('tabla productos creada'))
                    .catch((err) => console.log(err));
            }
            else {
                console.log('la tabla de productos ya existe');
            }
        }).finally(() => knex.destroy());
    });
}
function readProducts() {
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
exports.readProducts = readProducts;
function saveProduct(nombre, descripcion, precio, codigo, stock, foto) {
    return __awaiter(this, void 0, void 0, function* () {
        let info;
        try {
            let data = yield fs.promises.readFile(`${__dirname}/${fileName}.txt`, 'utf-8');
            info = JSON.parse(data);
            let id = info.length + 1;
            let product = { 'id': id,
                'nombre': nombre,
                'descripcion': descripcion,
                'precio': precio,
                'codigo': codigo,
                'stock': stock,
                'foto': foto,
                'timestamp': Date.now(),
            };
            info.push(product);
            yield fs.promises.writeFile(`${__dirname}/${fileName}.txt`, JSON.stringify(info, null, 4));
            return product;
        }
        catch (err) {
            console.log(err);
            return err;
        }
    });
}
exports.saveProduct = saveProduct;
function updateProduct(id, nombre, descripcion, precio, codigo, stock, foto) {
    return __awaiter(this, void 0, void 0, function* () {
        let productos;
        let posPrdEncontrado;
        try {
            let data = yield fs.promises.readFile(`${__dirname}/${fileName}.txt`, 'utf-8');
            productos = JSON.parse(data);
            for (let i = 0; i < productos.length; i++) {
                if (productos[i].id === id) {
                    posPrdEncontrado = i;
                    productos[i].nombre = nombre;
                    productos[i].descripcion = descripcion;
                    productos[i].precio = precio;
                    productos[i].codigo = codigo;
                    productos[i].stock = stock;
                    productos[i].foto = foto;
                    productos[i].nombre = nombre;
                    break;
                }
            }
            yield fs.promises.writeFile(`${__dirname}/${fileName}.txt`, JSON.stringify(productos, null, 4));
            return productos[posPrdEncontrado];
        }
        catch (err) {
            throw err;
        }
    });
}
exports.updateProduct = updateProduct;
function deleteProduct(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let productos;
        try {
            let data = yield fs.promises.readFile(`${__dirname}/${fileName}.txt`, 'utf-8');
            productos = JSON.parse(data);
            let prdEliminado = productos.splice(id - 1, 1);
            for (let i = id - 1; i < productos.length; i++) {
                productos[i].id--;
            }
            yield fs.promises.writeFile(`${__dirname}/${fileName}.txt`, JSON.stringify(productos, null, 4));
            return prdEliminado;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.deleteProduct = deleteProduct;
crearTablas();
//# sourceMappingURL=productos.repository.js.map