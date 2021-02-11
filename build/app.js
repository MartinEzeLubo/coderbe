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
const readWriteFiles_1 = require("./archivos/readWriteFiles");
const port = 8080;
const app = express_1.default();
const router = express_1.default.Router();
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_1.default.static(__dirname + '/public'));
app.get('/productos/vista', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let products;
    try {
        products = yield readWriteFiles_1.readDataFile();
        products = JSON.parse(products);
    }
    catch (err) {
    }
    res.render("pages/indexListado", { info: products });
}));
app.get('/productos/alta', (req, res) => {
    res.render("./pages/index");
});
router.get('/productos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let products = yield readWriteFiles_1.readDataFile();
    res.json(products);
}));
router.get('/productos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let products = yield readWriteFiles_1.readDataFile();
        let product = products.find(element => element.id === parseInt(req.params.id));
        if (!product) {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
        else {
            res.json({ 'item': product });
        }
    }
    catch (error) {
        res.send('Error de la aplicacion' + error).status(500);
    }
}));
router.post('/productos/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if ((!req.body.title || req.body.title === "" || req.body.price === null || req.body.price === undefined || !req.body.thumbnail || req.body.thumbnail === "")) {
        res.status(400).send('Los parametros enviados son incorrectos');
    }
    else {
        try {
            let data = yield readWriteFiles_1.writeDataFile(req.body.title, parseInt(req.body.price), req.body.thumbnail);
            res.render("./pages/index");
        }
        catch (error) {
            res.status(500).send('Error de la aplicacion' + error);
        }
    }
}));
router.put('/productos/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if ((!req.body.id || req.body.id === null || !req.body.title || req.body.title === "" || req.body.price === null || req.body.price === undefined || !req.body.thumbnail || req.body.thumbnail === "")) {
        res.status(400).send('Los parametros enviados son incorrectos');
    }
    else {
        try {
            let data = yield readWriteFiles_1.updateDataFile(parseInt(req.body.id), req.body.title, parseInt(req.body.price), req.body.thumbnail);
            res.json(data);
        }
        catch (error) {
            res.send('Error de la aplicacion').status(500);
        }
    }
}));
router.delete('/productos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let products = yield readWriteFiles_1.readDataFile();
        let product = products.find(element => element.id === parseInt(req.params.id));
        if (!product) {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
        else {
            let eliminar = yield readWriteFiles_1.deleteItem(parseInt(req.params.id));
            res.status(200).json(eliminar);
        }
    }
    catch (error) {
        res.send('Error de la aplicacion' + error).status(500);
    }
}));
app.get('/', (req, res) => {
    res.render('./pages/index');
});
app.use('/api', router);
app.listen(port, () => {
    return console.log(`Servidor listo en puerto ${port}`);
}).on('error', () => console.log('El puerto configurado se encuentra en uso'));
//# sourceMappingURL=app.js.map