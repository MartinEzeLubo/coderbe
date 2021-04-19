import express from 'express';

let router = express.Router();


router.get('/:user?:pass?', async (req, res) => {
    console.log(req.query.user);
    console.log(req.query.pass);
    if(!req.query.user || !req.query.pass){
        res.status(401).send('Login Failed')
    } else if (req.query.user === 'martin@garmin.com.ar' && req.query.pass === 'sarasasa'){
        req.session.login = true;
        res.status(200).send(req.session.login)
    } else {
        res.status(401).send()
    }
});

router.get('/logueado', async (req, res) => {
    
    console.log(req.session.login);
    if(req.session.login){
        res.status(200).send('estas logueado correctamente')
    } else {
        res.status(401).send('No estas logueado, por favor inicia sesion')

    }

});

export default router;