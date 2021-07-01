// @ts-nocheck
// Twilio - CoderbeNodeJS2021!
// sendSMS('Te logueaste con facebook', '+541150354113')

import express from 'express';
import routerProductos from './productos';
import routerChat from './chat';
import routerLogin from './login';
import routerRegister from './register'
import routerAuth from './auth'
import { fork } from 'child_process'
import numCPUs from 'os'
import { isPrime } from '../is-prime'
import passport from 'passport';
import { sendMail, sendMailGmail } from '../service/send.email.service'
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import {listarProductos, listarProductosGraphQL, guardarProducto, eliminarProducto, actualizarProducto} from '../service/productos.service'

const cpus = numCPUs.cpus().length;
let router = express.Router();



router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(passport.initialize());
router.use(passport.session());

router.use('/productos', routerProductos);
router.use('/chat', routerChat);
router.use('/login', routerLogin)
router.use('/register', routerRegister)
router.use('/auth', routerAuth)


router.get('/', (req, res) => {
    res.render("home", {
        nombre: "Hola invitado",
        foto: "https://i.picsum.photos/id/237/200/300.jpg",
        email: "invitado@invitado.com"
    })
    // if (req.isAuthenticated()) {
    //     res.render("home", {
    //         nombre: req.user.displayName,
    //         foto: req.user.photos[0].value,
    //         email: req.user.emails[0].value
    //     })
    // }
    // else {
    //     console.log(process.cwd());
    //     res.sendFile(process.cwd() +'/public/login.html')
    // }
})




router.get('/home', (req, res) => {
    res.redirect('/')
})


router.get('/faillogin', (req, res) => {
    res.render('login-error', {});
})

router.get('/logout', (req, res) => {
    let nombre = req.user.displayName
    let fecha = Date.now();
    let emailSubject = `Logout de ${req.user.displayName} a las ${new Date(fecha).toString()}`
    // sendMail(req.user.emails[0].value, emailSubject)
    // sendMailGmail(req.user.emails[0].value, emailSubject, req.user.displayName, '')
    req.logout()
    res.render("logout", { nombre })
})
///////////////////////////////////////////////////////////////////////////////

//

const schema = buildSchema(`
    type Query {
        product(id: String): Product,
        products: [Product],
        deleteProduct(id: String!): String
    }
    type Mutation {
        createProduct(nombre: String!, descripcion: String!, precio: Int!, codigo: String!, stock: Int!, foto: String!): Product,
        updateProduct(id: String!, nombre: String!, descripcion: String!, precio: Int!, codigo: String!, stock: Int!, foto: String!): Product,
    }
    type Product {
        id: String
        nombre: String
        descripcion: String
        precio: Int
        codigo: String
        stock: Int
        foto: String
    }
`)

const root = {
    product: getProduct,
    products: getProducts,
    createProduct: createProduct,
    deleteProduct: deleteProduct,
    updateProduct: updateProduct
}

async function getProduct(args){
    console.log(args);
    let data = await listarProductos(args)
    return data
}


async function getProducts(){
    let data = await listarProductosGraphQL()
    return data
}
async function createProduct(args){
    try {
        let info = await guardarProducto(args.nombre, args.descripcion, args.precio, args.codigo, args. stock, args.foto)
        return info
    } catch (error) {
        console.log(error);
    }
}
async function updateProduct(args){
    try {
        return await actualizarProducto(args.id, args.nombre, args.descripcion, args.precio, args.codigo, args. stock, args.foto)
       
    } catch (error) {
        console.log(error);
    }
}

async function deleteProduct(args){
    try {
        console.log(args.id);
        let info = await eliminarProducto(args.id)
        console.log(info);
        return 'Eliminado'
    } catch (error) {
        console.log(error);
    }
}


router.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))





///////////////////////////////////////////////////////////////////////////////

router.get('/info', (req, res) => {
    let data = {
        args: process.argv,
        plataform: process.platform,
        nodeversion: process.version,
        memory: process.memoryUsage(),
        path: process.argv[0],
        process: process.pid,
        execPath: process.argv[1],
        nroCores: cpus
    }
    res.send(data)

})

router.get('/randoms/:cant?', (req, res) => {

    let randomProcess = fork('./dist/utils/randomNumbers.js');
    if (req.params.cant) {
        randomProcess.send(req.params.cant)
    } else {
        randomProcess.send(100000000)
    }
    randomProcess.on('message', data => {
        res.send(data)
    })

})


router.get('/primos', (req, res) => {
    const primes = []
    const max = Number(req.query.max) || 1000
    for (let i = 1; i <= max; i++) {
        if (isPrime(i)) primes.push(i)
    }
    res.json(primes)
})

///////////////////////////////////////////////////////////////////////////////

export default router;









// router.get('/status', checkAuthentication, async (req, res, next) => {
//     res.status(200).send({ "idSession": req.sessionID })
// });


// router.get('/logout', async (req, res) => {
//     req.logout();
//     req.session.destroy(() => {
//         res.status(200).send();
//     });
// });


// export function checkAuthentication(req, res, next) {
//     if (req.isAuthenticated()) {
//         next();
//     } else {
//         res.status(401).send()
//     }
// }