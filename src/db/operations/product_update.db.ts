import {knex} from '../connections/maria.db';

export async function updateProduct(id: number, nombre: string, descripcion: string, precio: number, codigo: string, stock: number,  foto: string){
    try{
        knex('productos').where('id', '=', id)
        .update({'nombre': nombre,
        'descripcion': descripcion,
        'precio': precio,
        'codigo': codigo,
        'stock': stock,
        'foto': foto,
        'timestamp': Date.now()})
        .finally(()=>knex.destroy);

    } catch (err) {
        throw err;
    }
}

module.exports = {
    updateProduct
}