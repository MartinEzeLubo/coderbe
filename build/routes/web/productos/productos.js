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
const productCRUD_1 = require("../../../archivos/productCRUD");
let router = express_1.default.Router();
router.get('/alta', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let products = yield productCRUD_1.listProducts();
    res.render("pages/index", { info: products });
}));
router.post('/alta', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if ((!req.body.title || req.body.title === "" || req.body.price === null || req.body.price === undefined || !req.body.thumbnail || req.body.thumbnail === "")) {
        res.status(400).send('Los parametros enviados son incorrectos');
    }
    else {
        yield productCRUD_1.saveProduct(req.body.title, parseInt(req.body.price), req.body.thumbnail);
        res.redirect('/productos/alta');
        try {
        }
        catch (error) {
            res.status(500).send('Error de la aplicacion' + error);
        }
    }
}));
router.get('/vista', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let products = yield productCRUD_1.listProducts();
    res.render("pages/indexListado", { info: products });
}));
// io.on('new-product', (data) =>{
//     console.log(data);
//     // if((!req.body.title || req.body.title === "" || req.body.price === null || req.body.price === undefined || !req.body.thumbnail || req.body.thumbnail === "") ){
//     //     res.status(400).send('Los parametros enviados son incorrectos');
//     // } else {
//     //     await saveProduct(req.body.title, parseInt(req.body.price), req.body.thumbnail);
//     //     res.redirect('/productos/alta')
//     //     try {
//     //     } catch (error) { 
//     //     res.status(500).send('Error de la aplicacion' + error);
//     //     }
//     // }
// });
exports.default = router;
//# sourceMappingURL=productos.js.map