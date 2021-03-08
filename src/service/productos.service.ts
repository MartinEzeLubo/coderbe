import {readProducts, saveProduct, updateProduct, deleteProduct} from '../repositories/productos.repository'

async function listarProductos(id?:number){
  let productos;
  try {
    let data = await readProducts();
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
  console.log(nombre, descripcion, precio, codigo, stock, foto);

  if(!nombre || nombre === "" || !descripcion || descripcion === "" || precio === null || precio === undefined || !codigo || codigo === "" || stock === null || stock === undefined || !foto || foto === "") {
     return 'Los parametros enviados son incorrectos';
  } else {
    try {
      data = await saveProduct(nombre, descripcion, precio, codigo, stock, foto);
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
      data = await updateProduct(id, nombre, descripcion, precio, codigo, stock, foto);
  
    } catch (err) {
      return err;
    }
    return data;
  }
}
async function eliminarProducto(id: number){
  try {
    let data = await readProducts();
    let product = data.find(element => element.id === id);
        if (!product){
          return 'no se encontro el id indicado'
        }
        else {

        return deleteProduct(id);
        }
  } catch(err){
    return err;
  }

}  

export {eliminarProducto, actualizarProducto, guardarProducto, listarProductos};