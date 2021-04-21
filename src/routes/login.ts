import express from 'express';

let router = express.Router();


router.get('/:user?:pass?', async (req, res) => {
    if(!req.query.user || !req.query.pass){
        res.status(401).send('Login Failed')
    } else if (req.query.user && req.query.pass){
        req.session.login = true;
        res.status(200).json({mensaje: `Bienvenido ${req.query.user}`, idSession: req.sessionID}).send()
    } else {
        res.status(401).send()
    }
});

router.get('/logout', async (req, res) => {
    
    req.session.destroy;
    res.status(200).send();
    
});


export default router;