import {knexSQLite3} from '../connections/sqlite3.db';


export function crearChat(){
    knexSQLite3.schema.hasTable('chat').then(exists => {
        if (!exists) {
            let info = knexSQLite3.schema.createTable('chat', table =>{
                table.increments('id').primary();
                table.string('sender', 80);
                table.string('message', 200);
                table.string('timestamp');
                })
            .then(()=> console.log('tabla chat creada'))
            .catch((err)=> console.log(err))
            .finally(()=>knexSQLite3.destroy);
            
            knexSQLite3('chat')
                    .insert([
                        {
                            "sender": "asd@asd.com",
                            "message": "Buenas noches",
                            "timestamp": "1615761918128"
                        },
                        {
                            "sender": "asd@asd.com",
                            "message": "como va todo?",
                            "timestamp": "1615761918128"
                        }
            ]).then(()=> console.log('Chat insertado'))
            .catch((err)=> console.log(err))
            .finally(()=>knexSQLite3.destroy);
            

        } else {
            console.log('la tabla de chat ya existe');
        }
    })
}

module.exports = {
    crearChat
}