"use strict";
// @ts-nocheck
// Twilio - CoderbeNodeJS2021!
// sendSMS('Te logueaste con facebook', '+541150354113')
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
const productos_1 = __importDefault(require("./productos"));
const chat_1 = __importDefault(require("./chat"));
const login_1 = __importDefault(require("./login"));
const register_1 = __importDefault(require("./register"));
const auth_1 = __importDefault(require("./auth"));
const child_process_1 = require("child_process");
const os_1 = __importDefault(require("os"));
const is_prime_1 = require("../is-prime");
const passport_1 = __importDefault(require("passport"));
const express_graphql_1 = require("express-graphql");
const graphql_1 = require("graphql");
const productos_service_1 = require("../service/productos.service");
const cpus = os_1.default.cpus().length;
let router = express_1.default.Router();
router.use(express_1.default.json());
router.use(express_1.default.urlencoded({ extended: true }));
router.use(passport_1.default.initialize());
router.use(passport_1.default.session());
router.use('/productos', productos_1.default);
router.use('/chat', chat_1.default);
router.use('/login', login_1.default);
router.use('/register', register_1.default);
router.use('/auth', auth_1.default);
router.get('/', (req, res) => {
    res.render("home", {
        nombre: "Hola invitado",
        foto: "https://i.picsum.photos/id/237/200/300.jpg",
        email: "invitado@invitado.com"
    });
    // if (req.isAuthenticated()) {
    //     res.render("home", {
    //         nombre: req.user.displayName,
    //         foto: req.user.photos[0].value,
    //         email: req.user.emails[0].value
    //     })
    // }
    // else {
    //     console.log(process.cwd());
    //     res.sendFile(process.cwd() +'/public/login.html')
    // }
});
router.get('/home', (req, res) => {
    res.redirect('/');
});
router.get('/faillogin', (req, res) => {
    res.render('login-error', {});
});
router.get('/logout', (req, res) => {
    let nombre = req.user.displayName;
    let fecha = Date.now();
    let emailSubject = `Logout de ${req.user.displayName} a las ${new Date(fecha).toString()}`;
    // sendMail(req.user.emails[0].value, emailSubject)
    // sendMailGmail(req.user.emails[0].value, emailSubject, req.user.displayName, '')
    req.logout();
    res.render("logout", { nombre });
});
///////////////////////////////////////////////////////////////////////////////
//
const schema = graphql_1.buildSchema(`
    type Query {
        product(id: String): Product,
        products: [Product],
        deleteProduct(id: String!): String
    }
    type Mutation {
        createProduct(nombre: String!, descripcion: String!, precio: Int!, codigo: String!, stock: Int!, foto: String!): Product,
        updateProduct(id: String!, nombre: String!, descripcion: String!, precio: Int!, codigo: String!, stock: Int!, foto: String!): Product,
    }
    type Product {
        id: String
        nombre: String
        descripcion: String
        precio: Int
        codigo: String
        stock: Int
        foto: String
    }
`);
const root = {
    product: getProduct,
    products: getProducts,
    createProduct: createProduct,
    deleteProduct: deleteProduct,
    updateProduct: updateProduct
};
function getProduct(args) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(args);
        let data = yield productos_service_1.listarProductos(args);
        return data;
    });
}
function getProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield productos_service_1.listarProductosGraphQL();
        return data;
    });
}
function createProduct(args) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let info = yield productos_service_1.guardarProducto(args.nombre, args.descripcion, args.precio, args.codigo, args.stock, args.foto);
            return info;
        }
        catch (error) {
            console.log(error);
        }
    });
}
function updateProduct(args) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield productos_service_1.actualizarProducto(args.id, args.nombre, args.descripcion, args.precio, args.codigo, args.stock, args.foto);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function deleteProduct(args) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(args.id);
            let info = yield productos_service_1.eliminarProducto(args.id);
            console.log(info);
            return 'Eliminado';
        }
        catch (error) {
            console.log(error);
        }
    });
}
router.use('/graphql', express_graphql_1.graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
///////////////////////////////////////////////////////////////////////////////
router.get('/info', (req, res) => {
    let data = {
        args: process.argv,
        plataform: process.platform,
        nodeversion: process.version,
        memory: process.memoryUsage(),
        path: process.argv[0],
        process: process.pid,
        execPath: process.argv[1],
        nroCores: cpus
    };
    res.send(data);
});
router.get('/randoms/:cant?', (req, res) => {
    let randomProcess = child_process_1.fork('./dist/utils/randomNumbers.js');
    if (req.params.cant) {
        randomProcess.send(req.params.cant);
    }
    else {
        randomProcess.send(100000000);
    }
    randomProcess.on('message', data => {
        res.send(data);
    });
});
router.get('/primos', (req, res) => {
    const primes = [];
    const max = Number(req.query.max) || 1000;
    for (let i = 1; i <= max; i++) {
        if (is_prime_1.isPrime(i))
            primes.push(i);
    }
    res.json(primes);
});
///////////////////////////////////////////////////////////////////////////////
exports.default = router;
// router.get('/status', checkAuthentication, async (req, res, next) => {
//     res.status(200).send({ "idSession": req.sessionID })
// });
// router.get('/logout', async (req, res) => {
//     req.logout();
//     req.session.destroy(() => {
//         res.status(200).send();
//     });
// });
// export function checkAuthentication(req, res, next) {
//     if (req.isAuthenticated()) {
//         next();
//     } else {
//         res.status(401).send()
//     }
// }
//# sourceMappingURL=index.js.map