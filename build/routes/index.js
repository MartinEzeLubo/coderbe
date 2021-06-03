"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.checkAuthentication = void 0;
const express_1 = __importDefault(require("express"));
const productos_1 = __importDefault(require("./productos"));
const chat_1 = __importDefault(require("./chat"));
const login_1 = __importDefault(require("./login"));
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const passportLocal = __importStar(require("passport-local"));
const user_model_mongo_1 = require(".././models/user.model.mongo");
const bcrypt_1 = __importDefault(require("bcrypt"));
const app_1 = require("../app");
const child_process_1 = require("child_process");
const os_1 = __importDefault(require("os"));
const is_prime_1 = require("../is-prime");
const cpus = os_1.default.cpus().length;
let router = express_1.default.Router();
let LocalStrategy = passportLocal.Strategy;
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
router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.render("home", {
            nombre: req.user,
            foto: req.user,
            email: req.user,
            contador: req.user,
            //   nombre: req.user.displayName,
            //   foto: req.user.photos[0].value,
            //   email: req.user.emails[0].value,
            //   contador: req.user.contador 
        });
    }
    else {
        res.sendFile(process.cwd() + '/public/login.html');
    }
});
router.post('/register', passport_1.default.authenticate('register', {}), function (req, res) {
    res.status(200).send(req.user);
});
router.get('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.logout();
    req.session.destroy(() => {
        res.status(200).send();
    });
}));
router.get('/primos', (req, res) => {
    const primes = [];
    const max = Number(req.query.max) || 1000;
    for (let i = 1; i <= max; i++) {
        if (is_prime_1.isPrime(i))
            primes.push(i);
    }
    res.json(primes);
});
function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(401).send();
    }
}
exports.checkAuthentication = checkAuthentication;
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
router.get('/status', checkAuthentication, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send({ "idSession": req.sessionID });
}));
passport_1.default.use(new FacebookStrategy({
    clientID: process.argv[2] || "4353989081287409",
    clientSecret: process.argv[3] || '668dcf194b9cb32b2e02c1926a81efc8',
    callbackURL: "http://localhost:8080/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'emails'],
    scope: ['email']
}, function (accessToken, refreshToken, profile, done) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile.displayName);
    done(null, profile.displayName);
}));
// router.get('/auth/facebook', passport.authenticate('facebook'));
// router.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: `/login`}),
//  (req, res) => {
//     req.query.login = "true";
//     res.redirect("http://localhost:5000/status")
//   }) ;
router.get('/auth/facebook', passport_1.default.authenticate('facebook'));
router.get('/auth/facebook/callback', passport_1.default.authenticate('facebook', { successRedirect: '/home',
    failureRedirect: '/faillogin' }));
router.get('/home', (req, res) => {
    console.log(req.user);
    res.redirect('/');
});
router.get('/faillogin', (req, res) => {
    res.render('login-error', {});
});
router.get('/logout', (req, res) => {
    let nombre = req.user;
    // let nombre = req.user.displayName
    req.logout();
    res.render("logout", { nombre });
});
passport_1.default.use('register', new LocalStrategy({
    passReqToCallback: true
}, function (req, username, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        if (username && password) {
            try {
                let userExist = yield app_1.db.readUser(username);
                if (userExist) {
                    let error = "El usuario ya existe";
                    return done(error, false);
                }
                let newUser = { username: username,
                    password: createHash(password),
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                };
                let newUserModel = new user_model_mongo_1.user(newUser);
                newUserModel.save(err => {
                    if (err) {
                        throw err;
                    }
                    return done(null, newUser.username);
                });
            }
            catch (_a) {
            }
        }
    });
}));
passport_1.default.serializeUser(function (username, done) {
    done(null, username);
});
passport_1.default.deserializeUser(function (id, done) {
    let data = user_model_mongo_1.user.findById(id, function (err, user) {
        done(null, data);
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map