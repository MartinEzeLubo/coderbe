"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthentication = void 0;
const express_1 = __importDefault(require("express"));
const productos_1 = __importDefault(require("./productos"));
const chat_1 = __importDefault(require("./chat"));
const login_1 = __importDefault(require("./login"));
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const child_process_1 = require("child_process");
const os_1 = __importDefault(require("os"));
const is_prime_1 = require("../is-prime");
const send_email_service_1 = require("../service/send.email.service");
const cpus = os_1.default.cpus().length;
let router = express_1.default.Router();
// let LocalStrategy = passportLocal.Strategy;
let FacebookStrategy = passport_facebook_1.default.Strategy;
const createHash = function (password) {
    return bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(10), null);
};
router.use(express_1.default.json());
router.use(express_1.default.urlencoded({ extended: true }));
router.use('/productos', productos_1.default);
router.use('/chat', chat_1.default);
router.use('/login', login_1.default);
router.use(passport_1.default.initialize());
router.use(passport_1.default.session());
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.user.displayName, req.user.photos[0].value, req.user.emails[0].value);
        res.render("home", {
            nombre: req.user.displayName,
            foto: req.user.photos[0].value,
            email: req.user.emails[0].value,
        });
    }
    else {
        res.sendFile(process.cwd() + '/public/login.html');
    }
});
router.post('/register', passport_1.default.authenticate('register', {}), function (req, res) {
    res.status(200).send(req.user);
});
// router.get('/logout', async (req, res) => {
//     req.logout();
//     req.session.destroy(() => {
//         res.status(200).send();
//     });
// });
function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(401).send();
    }
}
exports.checkAuthentication = checkAuthentication;
passport_1.default.use(new FacebookStrategy({
    clientID: process.argv[2] || "4353989081287409",
    clientSecret: process.argv[3] || '668dcf194b9cb32b2e02c1926a81efc8',
    callbackURL: "http://localhost:8080/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'emails']
}, function (accessToken, refreshToken, profile, done) {
    let fecha = Date.now();
    let emailSubject = `Login de ${profile.displayName} a las ${new Date(fecha).toString()}`;
    send_email_service_1.sendMail(profile.emails[0].value, emailSubject);
    done(null, profile);
}));
router.get('/auth/facebook', passport_1.default.authenticate('facebook'));
router.get('/auth/facebook/callback', passport_1.default.authenticate('facebook', {
    successRedirect: '/home',
    failureRedirect: '/faillogin'
}));
router.get('/home', (req, res) => {
    res.redirect('/');
});
router.get('/faillogin', (req, res) => {
    res.render('login-error', {});
});
router.get('/logout', (req, res) => {
    let nombre = req.user.displayName;
    console.log('////////////////////');
    console.log(req.user.emails[0]);
    console.log('////////////////////');
    let fecha = Date.now();
    let emailSubject = `Logout de ${req.user.displayName} a las ${new Date(fecha).toString()}`;
    send_email_service_1.sendMail(req.user.emails[0].value, emailSubject);
    req.logout();
    res.render("logout", { nombre });
});
passport_1.default.serializeUser(function (username, done) {
    done(null, username);
});
passport_1.default.deserializeUser(function (data, done) {
    // let data = dbuser.findById(id, function (err, user) {
    done(null, data);
    // })
});
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
// passport.use('register', new LocalStrategy({
//     passReqToCallback: true
// },
//     async function (req, username, password, done) {
//         if (username && password) {
//             try {
//                 let userExist = await db.readUser(username)
//                 if (userExist) {
//                     let error = "El usuario ya existe"
//                     return done(error, false)
//                 }
//                 let newUser = {
//                     username: username,
//                     password: createHash(password),
//                     firstName: req.body.firstName,
//                     lastName: req.body.lastName
//                 }
//                 let newUserModel = new dbuser(newUser)
//                 newUserModel.save(err => {
//                     if (err) {
//                         throw err;
//                     }
//                     return done(null, newUser.username);
//                 })
//             }
//             catch {
//             }
//         }
//     }
// ))
//# sourceMappingURL=index.js.map