"use strict";
// @ts-nocheck
// Twilio - CoderbeNodeJS2021!
// sendSMS('Te logueaste con facebook', '+541150354113')
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
const send_email_service_1 = require("../service/send.email.service");
const express_graphql_1 = require("express-graphql");
const graphql_1 = require("graphql");
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
    if (req.isAuthenticated()) {
        res.render("home", {
            nombre: req.user.displayName,
            foto: req.user.photos[0].value,
            email: req.user.emails[0].value
        });
    }
    else {
        console.log(process.cwd());
        res.sendFile(process.cwd() + '/public/login.html');
    }
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
    send_email_service_1.sendMail(req.user.emails[0].value, emailSubject);
    send_email_service_1.sendMailGmail(req.user.emails[0].value, emailSubject, req.user.displayName, '');
    req.logout();
    res.render("logout", { nombre });
});
///////////////////////////////////////////////////////////////////////////////
const schema = graphql_1.buildSchema(`
    type Query {
        mensaje: String,
        numero: Int
    }
`);
const root = {
    mensaje: getMensaje,
    numero: getNumero
};
function getMensaje() {
    return 'Buen dia';
}
function getNumero() {
    return 123;
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