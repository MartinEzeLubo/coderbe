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
const app_1 = require("../app");
const axios = require('axios');
const url = require('url');
let router = express_1.default.Router();
router.get('/:id?:name?:rangeFrom?:rangeTo?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query.id);
    if (req.query.id) {
        try {
            let query = `?query={product(id: "${req.query.id}"){id,nombre,descripcion,precio,codigo,stock,foto}}`;
            axios.get(`http://localhost:8080/graphql/${query}`)
                .then(response => {
                if (response instanceof Error) {
                    res.status(404).send(response.message);
                }
                else {
                    res.status(200).json(response.data);
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        let query = `?query={products{id,nombre,descripcion,precio,codigo,stock,foto}}`;
        try {
            axios.get(`http://localhost:8080/graphql/${query}`)
                .then(response => {
                if (response instanceof Error) {
                    res.status(404).send(response.message);
                }
                else {
                    res.status(200).json(response.data);
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    // try {
    //     let data = await listarProductos(req.query);
    //     if (data instanceof Error){
    //         logger.log('warn', 'Advertencia: No se pudo guardar el producto' );
    //         res.status(404).json(data.message)
    //     }else{
    //         logger.log('info', `Informacion: Producto consultado: ${req.query}`);
    //         res.status(200).json(data);
    //     }
    // } catch (error) {
    //     logger.log('error', 'Error: ', error);
    //     res.status(500).send('Error de la aplicacion' + error);
    // }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        axios.post('http://localhost:8080/graphql', {
            query: `mutation {
            createProduct(
                nombre:"${req.body.nombre}",
                descripcion:"${req.body.descripcion}",
                precio: ${req.body.precio},
                codigo:"${req.body.codigo}",
                stock: ${req.body.stock},
                foto:"${req.body.thumbnail}",
                ){
                    id
                   nombre
                   descripcion
                   precio 
                }
        }`
        })
            .then(response => {
            if (response instanceof Error) {
                res.status(404).send(response.message);
            }
            else {
                res.status(200).json(response.data);
            }
        });
    }
    catch (error) {
        console.log(error);
    }
    // try {
    //     let data = await guardarProducto(req.body.nombre, req.body.descripcion, parseInt(req.body.precio), req.body.codigo, parseInt(req.body.stock), req.body.foto);
    //     logger.log('info', `Informacion: Producto guardado: ${data}`);
    //     res.status(201).json(data)
    // } catch (error) {
    //     logger.log('error', 'Error: ', error);
    //     res.status(400).send('Error: ' + error);
    // }
}));
router.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield productos_service_1.actualizarProducto(req.body.id, req.body.nombre, req.body.descripcion, parseInt(req.body.precio), req.body.codigo, parseInt(req.body.stock), req.body.foto);
        if (data instanceof Error) {
            app_1.logger.log('warn', 'Advertencia: No se pudo actualizar el producto');
            res.status(404).json(data.message);
        }
        else {
            app_1.logger.log('info', `Informacion: Producto actualizado: ${req.body.id}`);
            res.status(202).json(data);
        }
    }
    catch (error) {
        app_1.logger.log('error', 'Error: ', error);
        res.send('Error de la aplicacion').status(500);
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield productos_service_1.eliminarProducto(req.params.id);
        if (data instanceof Error) {
            app_1.logger.log('warn', 'Advertencia: No se pudo eliminar el producto');
            res.status(404).json(data.message);
        }
        else {
            app_1.logger.log('info', `Informacion: Producto eliminado: ${req.body.id}`);
            res.status(200).json(data);
        }
    }
    catch (error) {
        app_1.logger.log('error', 'Error: ', error);
        res.send('Error de la aplicacion' + error).status(500);
    }
}));
exports.default = router;
//# sourceMappingURL=productos.js.map