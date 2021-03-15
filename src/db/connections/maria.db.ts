export const connectionMariaDB  = 
    {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'Maria2021!',
      database : 'backend'
    }
  };
export const knex = require('knex')(connectionMariaDB);


module.exports = {
  connectionMariaDB,
  knex
}
