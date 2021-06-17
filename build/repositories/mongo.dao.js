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
const mensaje_model_mongo_1 = require("../models/mensaje.model.mongo");
const log_model_mongo_1 = require("../models/log.model.mongo");
const user_model_mongo_1 = require("../models/user.model.mongo");
class mongoDAO {
    //martinlubo.ddns.net:8102
    //mongodb://martinlubo.ddns.net:8102/ecommerce
    constructor() {
        const mongoose = require('mongoose');
        const mongoConnection = mongoose.connect('mongodb://mongoadmin:mongoadmin@cluster0-shard-00-00.womr0.mongodb.net:27017,cluster0-shard-00-01.womr0.mongodb.net:27017,cluster0-shard-00-02.womr0.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-ftyf8w-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
            .then(() => {
            console.log('se conecto correctamente');
            this.saveLogToDatabase();
        })
            .catch(error => console.log(error));
    }
    saveLogToDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = { timestamp: Date.now() };
                let logModel = new log_model_mongo_1.dbLog(data);
                logModel.save();
            }
            catch (error) {
                return error;
            }
        });
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
                return nuevoProductoModel;
            }
            catch (err) {
                return err;
            }
        });
    }
    read(id, name, rangeFrom, rangeTo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id && !name && !rangeFrom && !rangeTo) {
                    return yield producto_model_mongo_1.producto.find();
                }
                if (!id && !name && (rangeFrom || rangeTo)) {
                    if (rangeFrom && !rangeTo) {
                        return yield producto_model_mongo_1.producto.find({ precio: { $gt: rangeFrom, $lt: 999999999999999999999999999999 } });
                    }
                    else if (!rangeFrom && rangeTo) {
                        return yield producto_model_mongo_1.producto.find({ precio: { $gt: 0, $lt: rangeTo } });
                    }
                    else {
                        return yield producto_model_mongo_1.producto.find({ precio: { $gt: rangeFrom, $lt: rangeTo } });
                    }
                }
                let data = yield producto_model_mongo_1.producto.findOne({
                    $or: [
                        { _id: id },
                        { nombre: name }
                    ]
                });
                if (data === null) {
                    throw Error('No existe un producto con los valores buscados');
                }
                return data;
            }
            catch (err) {
                throw Error('No existe un producto con los valores buscados');
            }
        });
    }
    update(id, nombre, descripcion, precio, codigo, stock, foto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield producto_model_mongo_1.producto.findOneAndUpdate({ _id: id }, {
                    $set: {
                        nombre: nombre,
                        descripcion: descripcion,
                        precio: precio,
                        codigo: codigo,
                        stock: stock,
                        foto: foto,
                        timestamp: Date.now()
                    }
                }, { new: true });
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
    createMessage(mail, name, lastname, age, alias, avatar, text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let author = {
                    mail,
                    name,
                    lastname,
                    age,
                    alias,
                    avatar
                };
                let nuevoMensaje = {
                    text,
                    timestamp: Date.now()
                };
                let nuevoMensajeModel = yield new mensaje_model_mongo_1.mensaje(nuevoMensaje);
                nuevoMensajeModel.author = author;
                console.log(nuevoMensajeModel);
                yield nuevoMensajeModel.save();
                return nuevoMensajeModel;
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
    readMessage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (id) {
                    let data = yield mensaje_model_mongo_1.mensaje.findById(id);
                    if (data === null) {
                        throw Error('No existe un producto con el ID indicado');
                    }
                    return data;
                }
                return yield mensaje_model_mongo_1.mensaje.find();
            }
            catch (err) {
                throw Error('No existe un producto con el ID indicado');
            }
        });
    }
    createUser(username, password, email, firstName, lastName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newUser = {
                    username,
                    password,
                    email,
                    firstName,
                    lastName
                };
                let newUserModel = new user_model_mongo_1.userLogin(newUser);
                newUserModel.save();
            }
            catch (error) {
            }
        });
    }
    readUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield user_model_mongo_1.userLogin.findOne({ username: username });
                return data;
            }
            catch (error) {
            }
        });
    }
}
exports.mongoDAO = mongoDAO;
//# sourceMappingURL=mongo.dao.js.map