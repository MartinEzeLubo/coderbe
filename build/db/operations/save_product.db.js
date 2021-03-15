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
exports.saveProduct = void 0;
const maria_db_1 = require("../connections/maria.db");
function saveProduct(nombre, descripcion, precio, codigo, stock, foto) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = yield maria_db_1.knex('productos')
                .insert([{ 'nombre': nombre,
                    'descripcion': descripcion,
                    'precio': precio,
                    'codigo': codigo,
                    'stock': stock,
                    'foto': foto,
                    'timestamp': Date.now() }]).finally(() => maria_db_1.knex.destroy);
        }
        catch (err) {
            console.log(err);
            return err;
        }
    });
}
exports.saveProduct = saveProduct;
module.exports = {
    saveProduct
};
//# sourceMappingURL=save_product.db.js.map