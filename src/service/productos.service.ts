import * as database from '../repositories/dbSelection.repository';

async function listarProductos(id?:string){
  let producto;
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
      let data = await database.db.read(id);
      if(data){
        data = await database.db.update(id, nombre, descripcion, precio, codigo, stock, foto);
        return data;
      } else {
        return 'no se encuentra ningun producto con el id indicado'
      }
    } catch (err) {
      return err;
    }
  }
}
async function eliminarProducto(id: string){
  try {
    let data = await database.db.read(id);
    console.log(data);
    if(data){
      database.db.delete(id);
      return 'Producto eliminado';
    } else {
      return 'no se encuentra ningun producto con el id indicado'
    }
  } catch(err){
    return err;
  }

}  

export {eliminarProducto, actualizarProducto, guardarProducto, listarProductos};