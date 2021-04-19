import express from 'express';

let router = express.Router();


router.get('/', async (req, res) => {
    
    if(!req.body.user || !req.body.pass){
        res.send('Login Failed')
    } else if (req.body.user === 'martin@garmin.com.ar' && req.body.pass === 'sarasasa'){
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