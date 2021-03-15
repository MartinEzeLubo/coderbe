import {knex} from '../connections/maria.db';

export async function saveProduct(nombre: string, descripcion: string, precio: number, codigo: string, stock: number, foto: string){
    try{
        let data = await knex('productos')
        .insert([{'nombre': nombre,
                'descripcion': descripcion,
                'precio': precio,
                'codigo': codigo,
                'stock': stock,
                'foto': foto,
                'timestamp': Date.now()}]).finally(()=>knex.destroy);
    } catch (err) {
        console.log(err);
        return err;
    }
}

module.exports = {
 
    saveProduct
}