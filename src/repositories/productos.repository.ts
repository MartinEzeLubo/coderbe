const fs = require('fs');
const fileName= 'productosDDBB';
const { connection } = require('./../db/maria.db');
const knex = require('knex')(connection)


// async function crearTablas(){
//     knex.schema.hasTable('productos').then(exists => {
//         if (!exists) {
//             return knex.schema.createTable('productos', table =>{
//                 table.increments('id').primary();
//                 table.string('nombre', 40);
//                 table.string('Descripcion', 200);
//                 table.integer('precio');
//                 table.string('codigo', 40);
//                 table.integer('stock');
//                 table.string('foto', 200);
//                 table.date('timestamp');
//                 })
//             .then(()=> console.log('tabla productos creada'))
//             .catch((err)=> console.log(err))
     
//         } else {
//             console.log('la tabla de productos ya existe');
//         }
//     }).finally(()=> knex.destroy())
// }

async function readProducts() {
  try{
      let contenido = await fs.promises.readFile(`${__dirname}/${fileName}.txt`, 'utf-8');
      return JSON.parse(contenido);
  } catch (err) {
      console.log(err);
  }
}

async function saveProduct(nombre: string, descripcion: string, precio: number, codigo: string, stock: number, foto: string){
  let info;
  try{
      let data = await fs.promises.readFile(`${__dirname}/${fileName}.txt`, 'utf-8');
      
      info = JSON.parse(data);
      let id:Number = info.length+1;
      
      let product = {'id':  id,
                 'nombre': nombre,
                 'descripcion': descripcion,
                 'precio': precio,
                 'codigo': codigo,
                 'stock': stock,
                 'foto': foto, 
                 'timestamp': Date.now(),
      };
      info.push(product);
      
      await fs.promises.writeFile(`${__dirname}/${fileName}.txt`, JSON.stringify(info, null, 4));

      
      return product;
      

  } catch (err) {
      console.log(err);
      return err;
  }
}

async function updateProduct(id: number, nombre: string, descripcion: string, precio: number, codigo: string, stock: number,  foto: string){
  let productos;
  let posPrdEncontrado;

  try{
      let data = await fs.promises.readFile(`${__dirname}/${fileName}.txt`, 'utf-8');
      
      productos = JSON.parse(data);

      for(let i = 0; i < productos.length; i++){
          if (productos[i].id === id){
              posPrdEncontrado = i;
              productos[i].nombre = nombre;
              productos[i].descripcion = descripcion;
              productos[i].precio = precio;
              productos[i].codigo = codigo;
              productos[i].stock = stock;
              productos[i].foto = foto;
              productos[i].nombre = nombre;
              break
          }
      }

      await fs.promises.writeFile(`${__dirname}/${fileName}.txt`, JSON.stringify(productos, null, 4));

      return productos[posPrdEncontrado];

  } catch (err) {
      throw err;
  }



}
async function deleteProduct(id: number){
  let productos;

  try{
      let data = await fs.promises.readFile(`${__dirname}/${fileName}.txt`, 'utf-8');
      
      productos = JSON.parse(data);

      let prdEliminado = productos.splice(id-1, 1);
      
      for (let i = id-1; i<productos.length; i++){
          productos[i].id--;
      }
      await fs.promises.writeFile(`${__dirname}/${fileName}.txt`, JSON.stringify(productos, null, 4));

      return prdEliminado;

  } catch (err) {
      throw err;
  }



}

crearTablas();

export {readProducts, saveProduct, updateProduct, deleteProduct};