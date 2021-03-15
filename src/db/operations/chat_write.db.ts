import {knexSQLite3} from '../connections/sqlite3.db';

async function writeMessage(sender: string, message: string, date: string){

  try {
    knexSQLite3('chat')
    .insert([
        {
            "sender": sender,
            "message": message,
            "timestamp": date
        }])
    .then(()=> console.log('Chat insertado'))
    .catch((err)=> console.log(err))
    .finally(()=>knexSQLite3.destroy);
    
  } catch (err) {
    return err;
  }
}


module.exports = {
    writeMessage  
} 