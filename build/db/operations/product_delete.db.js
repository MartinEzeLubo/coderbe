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
exports.deleteProduct = void 0;
const maria_db_1 = require("../connections/maria.db");
function deleteProduct(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            maria_db_1.knex('productos').where('id', '=', id).del()
                .then(() => console.log('producto eliminado'));
        }
        catch (err) {
            throw err;
        }
    });
}
exports.deleteProduct = deleteProduct;
module.exports = {
    deleteProduct
};
//# sourceMappingURL=product_delete.db.js.map