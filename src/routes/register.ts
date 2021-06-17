import express, {Request} from 'express';
import passport from 'passport';
import passportFacebook from 'passport-facebook';
import * as passportLocal from 'passport-local';
import { userLogin as dbuser, userLogin } from '../models/user.model.mongo';
import bCrypt from 'bcrypt'
import { sendMail, sendMailGmail } from '../service/send.email.service'
import {sendSMS} from '../service/send.sms.service'
import {db} from '../app'

let LocalStrategy = passportLocal.Strategy;
let FacebookStrategy = passportFacebook.Strategy;
let router = express.Router();

const request = require('request');
const https = require('https');
const fs = require('fs');

const createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}

router.use(passport.initialize());
router.use(passport.session());

router.get('/', (req, res) => {
    res.sendFile(process.cwd() +'/public/register.html')
})

router.post('/',
    passport.authenticate('register', {}),
    function (req, res) {
        res.status(200).send(req.user);
    }
);

passport.use('register', new LocalStrategy({
    passReqToCallback: true
},
    async function (req, username, password, done) {

        if (username && password) {
            try {
                let userExist = await db.readUser(username)
                if (userExist) {
                    let error = "El usuario ya existe"
                    return done(error, false)
                }
                let newUser = {
                    username: username,
                    password: createHash(password),
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                }
                let newUserModel = new dbuser(newUser)
                newUserModel.save(err => {
                    if (err) {
                        throw err;
                    }
                    return done(null, newUser.username);
                })
            }
            catch {

            }

        }
    }
))

passport.use(new FacebookStrategy({
    clientID: process.argv[2] || "4353989081287409",
    clientSecret: process.argv[3] || '668dcf194b9cb32b2e02c1926a81efc8',
    callbackURL: process.env.URL_CALLBACK || "http://localhost:8080/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'emails']
},
    function (accessToken, refreshToken, profile, done) {
        let download = function (uri, filename, callback) {
            request.head(uri, function (err, res, body) {
                request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
            });
        };
        download(profile.photos[0].value, `${profile.displayName}.jpg`, function () {
            let fecha = Date.now();
            let emailSubject = `Login de ${profile.displayName} a las ${new Date(fecha).toString()}`
            // sendMailGmail(profile.emails[0].value, emailSubject, profile.displayName, `${profile.displayName}.jpg`)
            // sendSMS('Te logueaste con facebook', '+541150354113')
            // sendMail(profile.emails[0].value, emailSubject)
        });
        done(null, profile);
    }
))

passport.serializeUser(function (username, done) {
    done(null, username);
});

passport.deserializeUser(function (data, done) {
    // let data = dbuser.findById(id, function (err, user) {
    done(null, data);
    // })
})




export default router;