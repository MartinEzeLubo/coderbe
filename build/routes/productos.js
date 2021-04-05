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
const productos_service_1 = require("./../service/productos.service");
let router = express_1.default.Router();
// router.get('/', async (req, res) => {
//     try {
//         let data = await listarProductos(req);
//         if (data instanceof Error){
//             res.status(404).json(data.message)
//         }else{
//             res.status(200).json(data);
//         }
//     } catch (error) {
//         res.status(500).send('Error de la aplicacion' + error);
//     }
// });
//:id?:name?:rangeFrom?:rangeTo?
router.get('/:id?:name?:rangeFrom?:rangeTo?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield productos_service_1.listarProductos(req.query);
        if (data instanceof Error) {
            res.status(404).json(data.message);
        }
        else {
            res.status(200).json(data);
        }
    }
    catch (error) {
        res.status(500).send('Error de la aplicacion' + error);
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield productos_service_1.guardarProducto(req.body.nombre, req.body.descripcion, parseInt(req.body.precio), req.body.codigo, parseInt(req.body.stock), req.body.foto);
        res.status(201).json(data);
    }
    catch (error) {
        res.status(500).send('Error de la aplicacion' + error);
    }
}));
router.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield productos_service_1.actualizarProducto(req.body.id, req.body.nombre, req.body.descripcion, parseInt(req.body.precio), req.body.codigo, parseInt(req.body.stock), req.body.foto);
        if (data instanceof Error) {
            res.status(404).json(data.message);
        }
        else {
            res.status(202).json(data);
        }
    }
    catch (error) {
        res.send('Error de la aplicacion').status(500);
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield productos_service_1.eliminarProducto(req.params.id);
        if (data instanceof Error) {
            res.status(404).json(data.message);
        }
        else {
            res.status(200).json(data);
        }
    }
    catch (error) {
        res.send('Error de la aplicacion' + error).status(500);
    }
}));
exports.default = router;
//# sourceMappingURL=productos.js.map