import express from 'express';
import passport from 'passport';



let router = express.Router();

router.use(passport.initialize());
router.use(passport.session());


router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook',
    {
        successRedirect: '/home',
        failureRedirect: '/faillogin'
    }
));

passport.serializeUser(function (username, done) {
    done(null, username);
});

passport.deserializeUser(function (data, done) {
    // let data = dbuser.findById(id, function (err, user) {
    done(null, data);
    // })
})

export default router;