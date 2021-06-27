import * as CONFIG from '../app';
import * as sqlite from '../repositories/sqlite.dao'


const mongoDAO = require('../repositories/mongo.dao')

export let db;
export let chatdb

setTimeout(() => dbConfig(), 2000);

async function dbConfig() {
  let dbOption = CONFIG.DB_SELECTION
  switch (dbOption) {
    case "sqlite": {db = sqlite; db.crearTablaProductos();}
      break
    case "mongo": db = mongoDAO.getInstance();
      break
    default:
      return 'Error en la configuracion de DDBB'
  }

  let ChatdbOption = CONFIG.DB_SELECTION_CHAT
  switch (ChatdbOption) {
    case "sqlite": {
      chatdb = sqlite
      chatdb.crearTablaChat()
    }
      break
    case "mongo": chatdb = mongoDAO.getInstance();
      break
    default:
      return 'Error en la configuracion de DDBB'
  }



}
