

let instance;
let knex;
class sqliteDAO {

    constructor() {
        const connectionSQLite3 =
        {
            client: 'sqlite3',
            connection: {
                filename: "./db.sqlite"
            },
            useNullAsDefault: true
        };
        knex = require('knex')(connectionSQLite3);
        const sql = `
    CREATE TABLE IF NOT EXISTS productos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      descripcion TEXT,
        precio INTEGER,
        codigo TEXT,
        stock INTEGER,
        foto TEXT,
      )`
        knex.run(sql)
    }

    static getInstance() {
        if (!instance) {
            instance = new sqliteDAO()
        }
        return instance
    }
    async create(nombre: string, descripcion: string, precio: number, codigo: string, stock: number, foto: string) {

        let nuevoProducto = {
            nombre,
            descripcion,
            precio,
            codigo,
            stock,
            foto,
            timestamp: Date.now()
        }
        try {
            knex('productos')
                .insert([
                    {
                        "nombre": nombre,
                        "descripcion": descripcion,
                        "precio": precio,
                        "codigo": codigo,
                        "stock": stock,
                        "foto": foto,
                        "timestamp": Date.now()
                    }])
                .then(() => console.log('Chat insertado'))
                .catch((err) => console.log(err))
                .finally(() => instance.destroy);

        } catch (error) {

        }

    }

    async read() {
        try {
            return 'read de sqlite, o algo asi.'
        } catch (error) {

        }

    }
    async update() {
        return 'no deberia aparecer esto'

    }
    async delete() {

    }

}


module.exports = sqliteDAO