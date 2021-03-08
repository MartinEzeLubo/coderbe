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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const carritos_repository_1 = require("./../repositories/carritos.repository");
let router = express_1.default.Router();
router.get('/:id?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield carritos_repository_1.readCarritos();
        console.log(data);
        res.send(data);
    }
    catch (err) {
        res.send(err);
    }
}));
router.post('/:idCarrito&:idProducto', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield carritos_repository_1.addProductToCarrito(parseInt(req.params.idCarrito), parseInt(req.params.idProducto));
        res.send(data);
    }
    catch (err) {
        res.send(err);
    }
}));
router.delete('/:idCarrito&:idProducto', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield carritos_repository_1.deleteProductFromCarrito(parseInt(req.params.idCarrito), parseInt(req.params.idProducto));
        res.send(data);
    }
    catch (err) {
        res.send(err);
    }
}));
exports.default = router;
//# sourceMappingURL=carritos.js.map