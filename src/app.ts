import express from 'express';
import {readDataFile, writeDataFile, updateDataFile, deleteItem} from './archivos/readWriteFiles';
import handlebars from 'express-handlebars';

const port = 8080;
const app = express();
const router = express.Router();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");



app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use(express.static(__dirname + '/public'));


app.get('/productos/vista', async (req, res) => {
  
  
  let products
  try{
    products = await readDataFile();
    products = JSON.parse(products);
    
  } catch(err){
    
  }
  res.render("pages/indexListado", {info: products});
  
});
app.get('/productos/alta', (req, res) => {
  
  res.render("./pages/index");
  
});


router.get('/productos', async (req, res) => {
  let products = await readDataFile();
  res.json(products);

});


router.get('/productos/:id', async (req, res) => {

  try {
    let products = await readDataFile();
    let product = products.find(element => element.id === parseInt(req.params.id));
    if (!product){
      res.status(404).json({error: 'Producto no encontrado'})
    } else {
      res.json({'item': product});
    }
  } catch (error) {
    res.send('Error de la aplicacion' + error).status(500);
  }
});

router.post('/productos/', async (req, res) => {
  if((!req.body.title || req.body.title === "" || req.body.price === null || req.body.price === undefined || !req.body.thumbnail || req.body.thumbnail === "") ){
    res.status(400).send('Los parametros enviados son incorrectos');
  } else {
    try {
      let data = await writeDataFile(req.body.title, parseInt(req.body.price), req.body.thumbnail);
      res.render("./pages/index");
      
    } catch (error) { 
      res.status(500).send('Error de la aplicacion' + error);
    }

  }
});

router.put('/productos/', async (req, res) => {

  if((!req.body.id || req.body.id === null || !req.body.title || req.body.title === "" || req.body.price === null || req.body.price === undefined || !req.body.thumbnail || req.body.thumbnail === "") ){
    res.status(400).send('Los parametros enviados son incorrectos');

  } else {
    try {
  
      let data = await updateDataFile(parseInt(req.body.id), req.body.title, parseInt(req.body.price), req.body.thumbnail);
      res.json(data)    
    } catch (error) { 
      res.send('Error de la aplicacion').status(500);
    }

  }
  
});


router.delete('/productos/:id', async (req, res) => {
  
  try {
    let products = await readDataFile();
    let product = products.find(element => element.id === parseInt(req.params.id));
    if (!product){
      res.status(404).json({error: 'Producto no encontrado'})
    } else {
      let eliminar = await deleteItem(parseInt(req.params.id));
  
      res.status(200).json(eliminar);
    }
    
  } catch (error) {
    res.send('Error de la aplicacion' + error).status(500);

  }
});





app.get('/', (req, res) => {
  res.render('./pages/index');
});

app.use('/api', router);

app.listen(port, () => {
  
  return console.log(`Servidor listo en puerto ${port}`);
}).on('error', ()=>console.log('El puerto configurado se encuentra en uso'));

