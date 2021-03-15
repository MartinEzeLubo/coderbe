"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearTablas = void 0;
const maria_db_1 = require("../connections/maria.db");
function crearTablas() {
    maria_db_1.knex.schema.hasTable('productos').then(exists => {
        if (!exists) {
            let info = maria_db_1.knex.schema.createTable('productos', table => {
                table.increments('id').primary();
                table.string('nombre', 40);
                table.string('descripcion', 200);
                table.integer('precio');
                table.string('codigo', 40);
                table.integer('stock');
                table.string('foto', 200);
                table.string('timestamp');
            })
                .then(() => console.log('tabla productos creada'))
                .catch((err) => console.log(err))
                .finally(() => maria_db_1.knex.destroy);
            maria_db_1.knex('productos')
                .insert([
                {
                    "nombre": "Forerunner 35",
                    "descripcion": "Reloj GPS para correr fácil de usar con medición de frecuencia cardiaca en la muñeca",
                    "precio": 25999,
                    "codigo": "GRM0002",
                    "stock": 23,
                    "foto": "https://garmin.com.ar/Image/0/450_450-010-01689-03_1.jpg",
                    "timestamp": 1615761918128
                },
                {
                    "nombre": "Forerunner 45",
                    "descripcion": "Reloj de carrera con GPS que admite planes de entrenamiento de Garmin Coach",
                    "precio": 32999,
                    "codigo": "GRM0005",
                    "stock": 54,
                    "foto": "https://garmin.com.ar/Image/0/450_450-010-02156-01_1.jpg",
                    "timestamp": 1615761918128
                },
                {
                    "nombre": "Forerunner 235",
                    "descripcion": "Reloj GPS para correr fácil de usar con medición de frecuencia cardiaca en la muñeca",
                    "precio": 37999,
                    "codigo": "GRM0010",
                    "stock": 4,
                    "foto": "https://garmin.com.ar/Image/0/450_450-010-03717-54_1.jpg",
                    "timestamp": 1615761918128
                },
                {
                    "nombre": "Instinct Tactical",
                    "descripcion": "Reloj GPS para correr fácil de usar con medición de frecuencia cardiaca en la muñeca",
                    "precio": 42999,
                    "codigo": "GRM0287",
                    "stock": 8,
                    "foto": "https://garmin.com.ar/Image/0/450_450-010-02064-70_1.jpg",
                    "timestamp": 1615761918128
                },
                {
                    "nombre": "Instinct Solar Tactical",
                    "descripcion": "Reloj GPS para correr fácil de usar con medición de frecuencia cardiaca en la muñeca",
                    "precio": 75999,
                    "codigo": "GRM0106",
                    "stock": 16,
                    "foto": "https://garmin.com.ar/Image/0/450_450-010-02293-06_1.jpg",
                    "timestamp": 1615761918128
                },
                {
                    "nombre": "Fenix 6S Pro Solar",
                    "descripcion": "Reloj GPS para correr fácil de usar con medición de frecuencia cardiaca en la muñeca",
                    "precio": 149999,
                    "codigo": "GRM0051",
                    "stock": 2,
                    "foto": "https://garmin.com.ar/Image/0/450_450-010-02409-13_1.jpg",
                    "timestamp": 1615761918128
                },
                {
                    "nombre": "Venu SQ",
                    "descripcion": "Reloj GPS para correr fácil de usar con medición de frecuencia cardiaca en la muñeca",
                    "precio": 33999,
                    "codigo": "GRM0046",
                    "stock": 104,
                    "foto": "https://garmin.com.ar/Image/0/450_450-010-02427-11_1.jpg",
                    "timestamp": 1615761918128
                },
                {
                    "nombre": "Swim 2",
                    "descripcion": "Reloj GPS para correr fácil de usar con medición de frecuencia cardiaca en la muñeca",
                    "precio": 40999,
                    "codigo": "GRM0067",
                    "stock": 15,
                    "foto": "https://garmin.com.ar/Image/0/450_450-010-02247-01_1.jpg",
                    "timestamp": 1615761918128
                },
                {
                    "nombre": "MARQ Driver",
                    "descripcion": "Reloj GPS para correr fácil de usar con medición de frecuencia cardiaca en la muñeca",
                    "precio": 421999,
                    "codigo": "GRM0050",
                    "stock": 3,
                    "foto": "https://garmin.com.ar/Image/0/450_450-010-02006-00.jpg",
                    "timestamp": 1615761918128
                }
            ]).then(() => console.log('Productos insertados'))
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