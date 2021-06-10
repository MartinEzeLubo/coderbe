"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
let router = express_1.default.Router();
router.use(passport_1.default.initialize());
router.use(passport_1.default.session());
router.get('/facebook', passport_1.default.authenticate('facebook'));
router.get('/facebook/callback', passport_1.default.authenticate('facebook', {
    successRedirect: '/home',
    failureRedirect: '/faillogin'
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
//# sourceMappingURL=auth.js.map