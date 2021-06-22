var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let instance;
let knex;
class sqliteDAO {
    constructor() {
        const connectionSQLite3 = {
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
      )`;
        knex.run(sql);
    }
    static getInstance() {
        if (!instance) {
            instance = new sqliteDAO();
        }
        return instance;
    }
    create(nombre, descripcion, precio, codigo, stock, foto) {
        return __awaiter(this, void 0, void 0, function* () {
            let nuevoProducto = {
                nombre,
                descripcion,
                precio,
                codigo,
                stock,
                foto,
                timestamp: Date.now()
            };
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
                    }
                ])
                    .then(() => console.log('Chat insertado'))
                    .catch((err) => console.log(err))
                    .finally(() => instance.destroy);
            }
            catch (error) {
            }
        });
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return 'read de sqlite, o algo asi.';
            }
            catch (error) {
            }
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            return 'no deberia aparecer esto';
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
module.exports = sqliteDAO;
//# sourceMappingURL=sqlite.dao.js.map