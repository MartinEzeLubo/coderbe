import {logDAO} from '../repositories/log.dao'


let logdatabase = new logDAO;


export async function saveLogToDatabase(){

    logdatabase.saveLog()
    
}
