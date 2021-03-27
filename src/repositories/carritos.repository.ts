import {listarProductos} from './../service/productos.service'

const fs = require('fs');
const fileName= 'carritosDDBB';


async function readCarritos() {
  try{
      let contenido = await fs.promises.readFile(`${__dirname}/${fileName}.txt`, 'utf-8');
      return JSON.parse(contenido);
  } catch (err) {
      console.log(err);
  }
}

async function createCarrito(){
  let info;
  try{
    let data = await fs.promises.readFile(`${__dirname}/${fileName}.txt`, 'utf-8');
      
    info = JSON.parse(data);
    let id:Number = info.length+1;
      
    let carrito = {'id':  id,
                   'timestamp': Date.now(),
                   'productos': []
                  };
    
    info.push(carrito);
    
    await fs.promises.writeFile(`${__dirname}/${fileName}.txt`, JSON.stringify(info, null, 4));
  
    return carrito;
      

  } catch (err) {
      console.log(err);
      return err;
  }
}


async function addProductToCarrito(idCarrito: number, idProducto: string){
    let producto = await listarProductos(idProducto);

    try{

    let data = await readCarritos();
    for(let i = 0; i < data.length; i++){
        if (data[i].id === idCarrito){
              data[i].productos.push(producto)
              break
        }
    }
    await fs.promises.writeFile(`${__dirname}/${fileName}.txt`, JSON.stringify(data, null, 4));
    return 'producto agregado'
    } catch (err) {
      throw err;
    }
}
async function deleteProductFromCarrito(idCarrito: number, idProducto: number){
 
    try{
    let data = await readCarritos();
    
    for(let i = 0; i < data.length; i++){
        
        if (data[i].id === idCarrito){
            for(let x = 0; x< data[i].productos.length; x++){
                
                
                if(data[i].productos[x].id === idProducto)
                console.log(JSON.stringify(data[i].productos[x]));
                data[i].productos[x].splice(x-1, 1);
                break
            }  
        }
    }
    await fs.promises.writeFile(`${__dirname}/${fileName}.txt`, JSON.stringify(data, null, 4));
    return 'producto eliminado'
    } catch (err) {
      throw err;
    }
}



export {createCarrito, readCarritos, addProductToCarrito, deleteProductFromCarrito};