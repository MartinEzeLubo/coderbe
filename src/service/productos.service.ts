import * as database from '../repositories/dbSelection.repository';

async function listarProductos(id?:string){
  try {
    return await database.db.read(id);
  } catch (error) {
    return error;
  }
  
}
    
async function guardarProducto(nombre: string, descripcion: string, precio: number, codigo: string, stock: number, foto: string){
  let data;
  

  if(!nombre || nombre === "" || !descripcion || descripcion === "" || precio === null || precio === undefined || !codigo || codigo === "" || stock === null || stock === undefined || !foto || foto === "") {
     return 'Los parametros enviados son incorrectos';
  }
  try {
    data = await database.db.create(nombre, descripcion, precio, codigo, stock, foto);
    return data;
  } catch (err) {
    throw err;
  }
}

async function actualizarProducto(id: number, nombre: string, descripcion: string, precio: number, codigo: string, stock: number, foto: string){
  let data;

  if(id === null || id === undefined || !nombre || nombre === "" || !descripcion || descripcion === "" || precio === null || precio === undefined || !codigo || codigo === "" || stock === null || stock === undefined || !foto || foto === "") {
    return 'Los parametros enviados son incorrectos';
  }
  try {
    return await database.db.update(id, nombre, descripcion, precio, codigo, stock, foto);
  } catch (err) {
    return err;
  }

}
async function eliminarProducto(id: string){
  
  try {
    return await database.db.delete(id);
  } catch (error) {
    return error;
  }
      
}  

export {eliminarProducto, actualizarProducto, guardarProducto, listarProductos};