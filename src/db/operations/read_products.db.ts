import {knex} from '../connections/maria.db';

export async function readProducts() {
    let productos = [];

    await knex.select('*').from('productos').timeout(2000).then( data => {
        data.forEach(element => {
            productos.push(element)
        });
        
    })
    .catch((err)=>console.log(err))
    .finally(()=>knex.destroy);
    return productos;
}

module.exports = {
    readProducts
}