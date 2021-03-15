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
exports.readProducts = void 0;
const maria_db_1 = require("../connections/maria.db");
function readProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        let productos = [];
        yield maria_db_1.knex.select('*').from('productos').timeout(2000).then(data => {
            data.forEach(element => {
                productos.push(element);
            });
        })
            .catch((err) => console.log(err))
            .finally(() => maria_db_1.knex.destroy);
        return productos;
    });
}
exports.readProducts = readProducts;
module.exports = {
    readProducts
};
//# sourceMappingURL=product_read.db.js.map