import {knex} from '../connections/maria.db';

export async function deleteProduct(id: number){
    try{
        knex('productos').where('id', '=', id).del()
        .then(()=> console.log('producto eliminado'));
        
    } catch (err) {
        throw err;
    }
  }
  

module.exports = {
    deleteProduct
}