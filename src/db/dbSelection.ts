import * as CONFIG from '../app';
const sqliteDAO = require('../repositories/sqlite.dao') 
const mongoDAO = require('../repositories/mongo.dao')

export let db;

setTimeout(() => dbConfig(), 2000);

function dbConfig() {
  let dbOption = CONFIG.DB_SELECTION
  switch (dbOption) {
    case "sqlite": db = sqliteDAO.getInstance();
      break
    case "mongo": db = mongoDAO.getInstance();
      break
    default:
      return 'Error en la configuracion de DDBB'
  }
}