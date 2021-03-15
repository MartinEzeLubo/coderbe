export const connectionSQLite3  = 
    {
        client: 'sqlite3',
        connection: {
            filename: "./chat.sqlite"
            }
    };
export const knexSQLite3 = require('knex')(connectionSQLite3);


module.exports = {
  connectionSQLite3,
  knexSQLite3
}