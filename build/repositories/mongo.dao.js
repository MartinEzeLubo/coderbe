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
        const mongoConnection = mongoose.connect('mongodb://martinlubo.ddns.net:8102/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })
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
            catch (error) {
                return error;
            }
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id);
            try {
                if (id) {
                    let data = yield producto_model_mongo_1.producto.findOne({ _id: id });
                    console.log(data);
                    return data;
                }
                else {
                    let data = yield producto_model_mongo_1.producto.find();
                    return data;
                }
            }
            catch (error) {
                return error;
            }
        });
    }
    update(id, nombre, descripcion, precio, codigo, stock, foto) {
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
            catch (error) {
                return error;
            }
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.mongoDAO = mongoDAO;
//# sourceMappingURL=mongo.dao.js.map