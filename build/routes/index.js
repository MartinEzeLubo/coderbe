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
const passportLocal = __importStar(require("passport-local"));
const user_model_mongo_1 = require(".././models/user.model.mongo");
const bcrypt_1 = __importDefault(require("bcrypt"));
const app_1 = require("../app");
let router = express_1.default.Router();
let LocalStrategy = passportLocal.Strategy;
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
router.post('/login', passport_1.default.authenticate('login', { failureRedirect: '/login' }), function (req, res) {
    console.log(req.session.passport);
    res.send(req.session.passport.user);
});
router.post('/register', passport_1.default.authenticate('register', { failureRedirect: '/login' }), function (req, res) {
    console.log(req.session.passport);
    res.send(req.session.passport.user);
});
router.get('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.destroy(() => {
        res.status(200).send();
    });
}));
function checkAuthentication(req, res, next) {
    if (req.session.login) {
        console.log('auth ok');
        next();
    }
    else {
        res.status(401).send();
    }
}
exports.checkAuthentication = checkAuthentication;
router.get('/status', checkAuthentication, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send({ "idSession": req.sessionID });
}));
passport_1.default.use('login', new LocalStrategy({
    passReqToCallback: true
}, function (req, username, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = yield app_1.db.readUser(username);
            if (bcrypt_1.default.compareSync(password, data.password)) {
                data.password = '';
                done(null, data);
            }
            else {
                let error = "Los datos de inicio son incorrectos";
                done(error, false);
            }
        }
        catch (_a) {
        }
    });
}));
passport_1.default.use('register', new LocalStrategy({
    passReqToCallback: true
}, function (req, username, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`ûsername ${username}  - password: ${password}`);
        if (username && password) {
            try {
                let userExist = yield app_1.db.readUser(username);
                if (userExist) {
                    return done(null, 'El usuario ya existe');
                }
                let newUser = { username: username,
                    password: createHash(password),
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                };
                let newUserModel = new user_model_mongo_1.user(newUser);
                newUserModel.save(err => {
                    if (err) {
                        console.log('Error al guardar usuario: ' + err);
                        throw err;
                    }
                    console.log('Usuario registrado correctamente');
                    return done(null, newUser);
                });
            }
            catch (_a) {
            }
        }
    });
}));
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.deserializeUser(function (id, done) {
    // user.findById(id, function(err, user){
    done(null, { username: 'martin', id: 'asdasdasd' });
    // })
});
exports.default = router;
// let newUser = new user();
//               newUser.username = username;
//               newUser.password = createHash(password);
//               newUser.email = req.body.email;
//               newUser.firstName = req.body.firstName;findOrCreateUser
// router.post('/login/:user?:pass?', async (req, res) => {
//     if(!req.query.user || !req.query.pass){
//         res.status(401).send('Login Failed')
//     } else if (req.query.user && req.query.pass){
//         req.session.login = true;
//         res.status(200).send(req.sessionID)
//     } else {
//         res.status(401).send()
//     }
// });
//# sourceMappingURL=index.js.map