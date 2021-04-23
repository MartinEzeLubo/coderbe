import express from 'express';

let router = express.Router();



router.get('/login/:user?:pass?', async (req, res) => {
    if(!req.query.user || !req.query.pass){
        res.status(401).send('Login Failed')
    } else if (req.query.user && req.query.pass){
        req.session.login = true;
        res.status(200).json({idSession: req.sessionID}).send()
    } else {
        res.status(401).send()
    }
});


export default router;