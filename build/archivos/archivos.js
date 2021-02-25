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
exports.Archivo = void 0;
const fs = require('fs');
class Archivo {
    constructor(name) {
        this.contador = 0;
        this.fileName = name;
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let contenido = yield fs.promises.readFile(`${__dirname}/${this.fileName}.txt`, 'utf-8');
                return JSON.parse(contenido);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    save(newTitle, newPrice, newUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            let info;
            try {
                let data = yield fs.promises.readFile(`${__dirname}/${this.fileName}.txt`, 'utf-8');
                info = JSON.parse(data);
                let id = info.length + 1;
                let product = { 'title': newTitle,
                    'price': newPrice,
                    'thumbnail': newUrl,
                    'id': id,
                };
                info.push(product);
                yield fs.promises.writeFile(`${__dirname}/${this.fileName}.txt`, JSON.stringify(info, null, 4));
                return product;
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
    update(id, newTitle, newPrice, newUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            let productos;
            let posPrdEncontrado;
            try {
                let data = yield fs.promises.readFile(`${__dirname}/${this.fileName}.txt`, 'utf-8');
                productos = JSON.parse(data);
                for (let i = 0; i < productos.length; i++) {
                    if (productos[i].id === id) {
                        posPrdEncontrado = i;
                        productos[i].title = newTitle;
                        productos[i].price = newPrice;
                        productos[i].thumbnail = newUrl;
                        break;
                    }
                }
                yield fs.promises.writeFile(`${__dirname}/${this.fileName}.txt`, JSON.stringify(productos, null, 4));
                return productos[posPrdEncontrado];
            }
            catch (err) {
                throw err;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let productos;
            try {
                let data = yield fs.promises.readFile(`${__dirname}/${this.fileName}.txt`, 'utf-8');
                productos = JSON.parse(data);
                let prdEliminado = productos.splice(id - 1, 1);
                for (let i = id - 1; i < productos.length; i++) {
                    productos[i].id--;
                }
                yield fs.promises.writeFile(`${__dirname}/${this.fileName}.txt`, JSON.stringify(productos, null, 4));
                return prdEliminado;
            }
            catch (err) {
                throw err;
            }
        });
    }
    borrarArchivo() {
        return __awaiter(this, void 0, void 0, function* () {
            fs.unlink(`${__dirname}/${this.fileName}.txt`, (error) => {
                if (error)
                    throw error;
            });
        });
    }
    saveChat(sender, message, date) {
        return __awaiter(this, void 0, void 0, function* () {
            let messageLog;
            try {
                let data = yield fs.promises.readFile(`${__dirname}/${this.fileName}.txt`, 'utf-8');
                messageLog = JSON.parse(data);
                let id = messageLog.length + 1;
                let newMessage = { sender,
                    message,
                    date
                };
                messageLog.push(newMessage);
                yield fs.promises.writeFile(`${__dirname}/${this.fileName}.txt`, JSON.stringify(messageLog, null, 4));
                return newMessage;
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
}
exports.Archivo = Archivo;
//# sourceMappingURL=archivos.js.map