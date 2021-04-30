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
router.post('/login', passport_1.default.authenticate('login', { failureRedirect: '/login' }), function (req, res) {
    res.status(200).send(req.user);
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
function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
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
passport_1.default.use(new FacebookStrategy({
    clientID: "178865330778385",
    clientSecret: 'd8ea15cb8e904fef12b5bd6d8c87d4e1',
    callbackURL: "http://localhost:8080/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'emails'],
    scope: ['email']
}, function (accessToken, refreshToken, profile, done) {
    done(null, profile.displayName);
}));
router.get('/auth/facebook', passport_1.default.authenticate('facebook'));
router.get('/auth/facebook/callback', passport_1.default.authenticate('facebook', { failureRedirect: `/login` }), (req, res) => {
    req.query.login = "true";
    res.redirect("http://localhost:3000/");
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