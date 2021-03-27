import * as ENV from '../app';
import * as DBRepo from './dao.modules';

export let db;

setTimeout(() => dbConfig(), 2000);

function dbConfig(){
  switch (ENV.DB_SELECTION){
    // case 0: db = new DBRepo.mongoDAO;
    //     break
    // case 1: db = new DBRepo.fsDAO;
    //     break
    // case 2: db = new DBRepo.MySQLDAO;
    //     break
    // case 3: db = new DBRepo.MySQLDBaaSDAO;
    //     break
    // case 4: db = new DBRepo.sqliteDAO;
    //     break
    case 5: db = new DBRepo.mongoDAO;
        break
    // case 6: db = new DBRepo.mongoDBaaSDAO;
    //     break
    // case 7: db = new DBRepo.firebaseDAO;
    //     break

    default: 
        return 'Error en la configuracion de DDBB'
  }
}
