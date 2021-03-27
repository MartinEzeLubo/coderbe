import * as database from '../repositories/dbSelection.repository';

async function listarProductos(id?:string){
  let producto;
  console.log('productos.service '+id);
  try {
    if (id){
      producto = await database.db.read(id);
      return producto;
    } else {
      producto = await database.db.read();
      return producto;
    }
  } catch(err){
    return err;
  }

  return [];
}
    
async function guardarProducto(nombre: string, descripcion: string, precio: number, codigo: string, stock: number, foto: string){
  let data;
  

  if(!nombre || nombre === "" || !descripcion || descripcion === "" || precio === null || precio === undefined || !codigo || codigo === "" || stock === null || stock === undefined || !foto || foto === "") {
     return 'Los parametros enviados son incorrectos';
  } else {
    try {
      data = await database.db.create(nombre, descripcion, precio, codigo, stock, foto);
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
      data = await database.db.update(id, nombre, descripcion, precio, codigo, stock, foto);
  
    } catch (err) {
      return err;
    }
    return data;
  }
}
async function eliminarProducto(id: number){
  try {
    let data = await database.db.read();
    let product = data.find(element => element.id === id);
        if (!product){
          return 'no se encontro el id indicado'
        }
        else {
          return database.db.delete(id);
        }
  } catch(err){
    return err;
  }

}  

export {eliminarProducto, actualizarProducto, guardarProducto, listarProductos};