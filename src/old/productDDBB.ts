// const dataSource = new Archivo('productos');


// export class ProductDDBB {

//   fileName: string;
//   contador = 0;

//     constructor(name: string){
//     this.fileName = name;
//   }



// }


// async function listProducts(){
//   try {
//     let data = await dataSource.read();
//     return data;
//   } catch(err){
//     return err;
//   }
// }
  
// async function saveProduct(title: string, price: number, thumbnail: string){
//   let data;
//   try {
//     data = await dataSource.save(title, price, thumbnail)
//     return data;
//   } catch (err) {
//     return err;
//   }
// }

// async function updateProduct(id: number, title: string, price: number, thumbnail: string){
//   let data;
//     try {
//       data = await dataSource.update(id, title, price, thumbnail);
  
//     } catch (err) {
//       return err;
//     }
//     return data;
// }
// async function deleteProduct(id: number){
//   let data;
//     try {
//       data = await dataSource.delete(id);
  
//     } catch (err) {
//       return err;
//     }
//     return data;
// }


// export {listProducts, saveProduct, updateProduct, deleteProduct};
