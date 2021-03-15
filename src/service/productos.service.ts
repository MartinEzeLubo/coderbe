import * as db from '../db/db.modules'

async function listarProductos(id?:number){
  let productos;
  try {
    let data = await db.readProducts();
    if (id){
      for(let i= 0; i < data.length; i++){
        console.log(data[i]);
        if (data[i].id === id){
          productos = data[i];
          break
        }
      }
      return productos;
    } else {
      return data;
    }
  } catch(err){
    return err;
  }
}
    
async function guardarProducto(nombre: string, descripcion: string, precio: number, codigo: string, stock: number, foto: string){
  let data;
  

  if(!nombre || nombre === "" || !descripcion || descripcion === "" || precio === null || precio === undefined || !codigo || codigo === "" || stock === null || stock === undefined || !foto || foto === "") {
     return 'Los parametros enviados son incorrectos';
  } else {
    try {
      data = await db.saveProduct(nombre, descripcion, precio, codigo, stock, foto);
      return data;
    } catch (err) {
      return err;
    }
  }   
}

async function actualizarProducto(id: number, nombre: string, descripcion: string, precio: number, codigo: string, stock: number, foto: string){
  let data;

  if(id === null || id === undefined || !nombre || nombre === "" || !descripcion || descripcion === "" || precio === null || precio === undefined || !codigo || codigo === "" || stock === null || stock === undefined || !foto || foto === "") {
    return 'Los parametros enviados son incorrectos';
  } else {
    try {
      data = await db.updateProduct(id, nombre, descripcion, precio, codigo, stock, foto);
  
    } catch (err) {
      return err;
    }
    return data;
  }
}
async function eliminarProducto(id: number){
  try {
    let data = await db.readProducts();
    let product = data.find(element => element.id === id);
        if (!product){
          return 'no se encontro el id indicado'
        }
        else {
          return db.deleteProduct(id);
        }
  } catch(err){
    return err;
  }

}  

export {eliminarProducto, actualizarProducto, guardarProducto, listarProductos};