"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearTablas = void 0;
const maria_db_1 = require("./../db/connections/maria.db");
function crearTablas() {
    maria_db_1.knex.schema.hasTable('productos').then(exists => {
        if (!exists) {
            return maria_db_1.knex.schema.createTable('productos', table => {
                table.increments('id').primary();
                table.string('nombre', 40);
                table.string('Descripcion', 200);
                table.integer('precio');
                table.string('codigo', 40);
                table.integer('stock');
                table.string('foto', 200);
                table.date('timestamp');
            })
                .then(() => console.log('tabla productos creada'))
                .catch((err) => console.log(err))
                .finally(() => maria_db_1.knex.destroy);
        }
        else {
            console.log('la tabla de productos ya existe');
        }
    });
}
exports.crearTablas = crearTablas;
module.exports = {
    crearTablas
};
//# sourceMappingURL=create_tables.db.js.map