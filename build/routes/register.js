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
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const passportLocal = __importStar(require("passport-local"));
const user_model_mongo_1 = require("../models/user.model.mongo");
const bcrypt_1 = __importDefault(require("bcrypt"));
const send_email_service_1 = require("../service/send.email.service");
const app_1 = require("../app");
let LocalStrategy = passportLocal.Strategy;
let FacebookStrategy = passport_facebook_1.default.Strategy;
let router = express_1.default.Router();
const request = require('request');
const https = require('https');
const fs = require('fs');
const createHash = function (password) {
    return bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(10), null);
};
router.use(passport_1.default.initialize());
router.use(passport_1.default.session());
router.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/register.html');
});
router.post('/', passport_1.default.authenticate('register', {}), function (req, res) {
    res.status(200).send(req.user);
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
                let newUser = {
                    username: username,
                    password: createHash(password),
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                };
                let newUserModel = new user_model_mongo_1.userLogin(newUser);
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
passport_1.default.use(new FacebookStrategy({
    clientID: process.argv[2] || "4353989081287409",
    clientSecret: process.argv[3] || '668dcf194b9cb32b2e02c1926a81efc8',
    callbackURL: process.env.URL_CALLBACK || "http://localhost:8080/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'emails']
}, function (accessToken, refreshToken, profile, done) {
    let download = function (uri, filename, callback) {
        request.head(uri, function (err, res, body) {
            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
    };
    download(profile.photos[0].value, `${profile.displayName}.jpg`, function () {
        let fecha = Date.now();
        let emailSubject = `Login de ${profile.displayName} a las ${new Date(fecha).toString()}`;
        send_email_service_1.sendMailGmail(profile.emails[0].value, emailSubject, profile.displayName, `${profile.displayName}.jpg`);
        send_email_service_1.sendMail(profile.emails[0].value, emailSubject);
    });
    done(null, profile);
}));
passport_1.default.serializeUser(function (username, done) {
    done(null, username);
});
passport_1.default.deserializeUser(function (data, done) {
    // let data = dbuser.findById(id, function (err, user) {
    done(null, data);
    // })
});
exports.default = router;
//# sourceMappingURL=register.js.map