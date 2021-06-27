export function SqliteConnector() {

    let db = null;

    async function DbConnect() {
        try {
            const connectionSQLite3 =
            {
                client: 'sqlite3',
                connection: {
                    filename: "./db.sqlite"
                },
                useNullAsDefault: true
            };
           let knex = require('knex')(connectionSQLite3);

            return knex
        } catch (e) {
            return e;
        }
    }

    async function Get() {
        try {
            if (db != null) {
                console.log(`db connection is already alive`);
                return db;
            } else {
                console.log(`getting new db connection`);
                db = await DbConnect();
                return db;
            }
        } catch (e) {
            return e;
        }
    }

    return {
        Get: Get
    }
}

module.exports = SqliteConnector();