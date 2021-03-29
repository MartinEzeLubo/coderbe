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
exports.mongoDAO = void 0;
const producto_model_mongo_1 = require("../models/producto.model.mongo");
class mongoDAO {
    constructor() {
        const mongoose = require('mongoose');
        const mongoConnection = mongoose.connect('mongodb://martinlubo.ddns.net:8102/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
            .then(() => console.log('se conecto correctamente'))
            .catch(error => console.log(error));
    }
    create(nombre, descripcion, precio, codigo, stock, foto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let nuevoProducto = {
                    nombre,
                    descripcion,
                    precio,
                    codigo,
                    stock,
                    foto,
                    timestamp: Date.now()
                };
                let nuevoProductoModel = new producto_model_mongo_1.producto(nuevoProducto);
                nuevoProductoModel.save();
                return nuevoProducto;
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (id) {
                    let data = yield producto_model_mongo_1.producto.findById(id);
                    if (data === null) {
                        throw Error('No se encuentra el ID');
                    }
                    return data;
                }
                return yield producto_model_mongo_1.producto.find();
            }
            catch (err) {
                throw Error('No existe un producto con el ID indicado');
            }
        });
    }
    update(id, nombre, descripcion, precio, codigo, stock, foto) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            try {
                return yield producto_model_mongo_1.producto.findOneAndUpdate({ _id: id }, { $set: {
                        nombre: nombre,
                        descripcion: descripcion,
                        precio: precio,
                        codigo: codigo,
                        stock: stock,
                        foto: foto,
                        timestamp: Date.now()
                    } }, { new: true });
            }
            catch (err) {
                throw Error('No existe un producto con el ID indicado');
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield producto_model_mongo_1.producto.findOneAndDelete({ _id: id });
                if (data === null) {
                    throw Error('No existe un producto con el ID indicado');
                }
                return data;
            }
            catch (err) {
                throw Error(`No existe un producto con el ID indicado`);
            }
        });
    }
}
exports.mongoDAO = mongoDAO;
//# sourceMappingURL=mongo.dao.js.map