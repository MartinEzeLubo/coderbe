import {db} from '../db/dbSelection'

async function listarProductos(req){

  let id = req.id || req.toString();
  let name = req.name || null;
  let rangeFrom;
  let rangeTo;

  if(req.rangeFrom){
  rangeFrom = parseInt(req.rangeFrom)
  };
  if (req.rangeTo){
    rangeTo = parseInt(req.rangeTo);
  }

  try {
    return await db.readProduct(id, name, rangeFrom, rangeTo);
  } catch (error) {
    return error;
  }
  
}
async function listarProductosGraphQL(){
  try {
    return await db.readProduct();
  } catch (error) {
    return error;
  }
  
}
    
async function guardarProducto(nombre: string, descripcion: string, precio: number, codigo: string, stock: number, foto: string){
  
  if(!nombre || nombre === "" || !descripcion || descripcion === "" || precio === null || precio === undefined || !codigo || codigo === "" || stock === null || stock === undefined || !foto || foto === "") {
    let err = 'Los parametros enviados son incorrectos';
    throw err;
  }
  try {
    return db.createProduct(nombre, descripcion, precio, codigo, stock, foto)
  } catch (err) {
    throw err;
  }
  
}


async function actualizarProducto(id: string, nombre: string, descripcion: string, precio: number, codigo: string, stock: number, foto: string){
  let data;

  if(id === null || id === undefined || !nombre || nombre === "" || !descripcion || descripcion === "" || precio === null || precio === undefined || !codigo || codigo === "" || stock === null || stock === undefined || !foto || foto === "") {
    return 'Los parametros enviados son incorrectos';
  }
  try {
    return await db.updateProduct(id, nombre, descripcion, precio, codigo, stock, foto);
  } catch (err) {
    return err;
  }

}
async function eliminarProducto(id: string){
  
  try {
    return await db.deleteProduct(id);
  } catch (error) {
    return error;
  }
      
}  

export {eliminarProducto, actualizarProducto, guardarProducto, listarProductos, listarProductosGraphQL};