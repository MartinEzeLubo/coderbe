import {knexSQLite3} from '../connections/sqlite3.db';


async function listChat(){
  try {
    await knexSQLite3.select('*').from('chat')
    .then( data => {
      console.log(data);
    })
  } catch(err){
    return err;
  }
}
  
module.exports = {
  listChat
}