const SqliteConnector = require('./sqlite.connector')




export async function createProduct(nombre: string, descripcion: string, precio: number, codigo: string, stock: number, foto: string) {


    try {
        let db = await SqliteConnector.Get();
        let product = await db('productos')
            .insert([{
                'nombre': nombre,
                'descripcion': descripcion,
                'precio': precio,
                'codigo': codigo,
                'stock': stock,
                'foto': foto,
                'timestamp': Date.now()
            }]).finally(() => db.destroy);
    } catch (err) {
        console.log(err);
        return err;
    }
}





export async function readProduct() {
    let productos = [];
    try {
        let db = await SqliteConnector.Get();
        await db.select('*').from('productos').then(data => {
            data.forEach(element => {
                productos.push(element)
            });

        })
            .catch((err) => console.log(err))
            .finally(() => db.destroy);
        return productos;

    } catch (error) {

    }
}


export async function updateProduct(id: string, nombre: string, descripcion: string, precio: number, codigo: string, stock: number, foto: string) {
    try {
        let db = await SqliteConnector.Get();

        db('productos').where('id', '=', id)
            .update({
                'nombre': nombre,
                'descripcion': descripcion,
                'precio': precio,
                'codigo': codigo,
                'stock': stock,
                'foto': foto,
                'timestamp': Date.now()
            })
            .finally(() => db.destroy);

    } catch (err) {
        throw err;
    }

}

export async function deleteProduct(id: string) {
    try {
        let db = await SqliteConnector.Get();

        db('productos').where('id', '=', id).del()
            .then(() => console.log('producto eliminado'));

    } catch (err) {
        throw err;
    }

}



export async function createMessage(mail: string, name: string, lastname: string, age: number, alias: string, avatar: string, text: string) {


    try {
        let db = await SqliteConnector.Get();

        db('chat')
        .insert([
            {
                "mail": mail,
                "name": name,
                "lastname": lastname,
                "age": age,
                "alias": alias,
                "avatar": avatar,
                "text": text,
            }])
        .then(()=> console.log('Chat insertado'))
        .catch((err)=> console.log(err))
        .finally(()=>db.destroy);
        
      } catch (err) {
        return err;
      }

}

export async function readMessage(id?: string) {
    let mensajes = [];
    try {
        let db = await SqliteConnector.Get();
        console.log('readMessage');
        await db.select('*').from('chat')
            .then(data => {
                data.forEach(element => {
                    mensajes.push(element)
                });
                console.log(data);
            })
    } catch (err) {
        return err;
    }

}



// async function createUser(username: String, password: String, email?: string, firstName?: String, lastName?: String) {
//     try {
//         let newUser = {
//             username,
//             password,
//             email,
//             firstName,
//             lastName
//         }
// async function saveLogToDatabase() {
//     try {
//         let data = { timestamp: Date.now() }

//         let logModel = new dbLog(data);
//         logModel.save();

//     } catch (error) {
//         return error
//     }
// }

//     }

// }

// async function saveLogToDatabase() {
//     try {
//         let data = { timestamp: Date.now() }

//         let logModel = new dbLog(data);
//         logModel.save();

//     } catch (error) {
//         return error
//     }
// }







export async function crearTablaChat() {

    try {
        let db = await SqliteConnector.Get();

        console.log('creando tabla chat');
        db.schema.hasTable('chat').then(exists => {
            if (!exists) {
                console.log('existe');
                let info = db.schema.createTable('chat', table => {
                    table.increments('id').primary();
                    table.string('mail', 80);
                    table.string('name', 200);
                    table.string('lastname', 200);
                    table.integer('age');
                    table.string('alias', 200);
                    table.string('avatar', 200);
                    table.string('timestamp');
                })


                
                    .then(() => console.log('tabla chat creada'))
                    .catch((err) => console.log(err))
                    .finally(() => db.destroy);

                SqliteConnector('chat')
                    .insert([
                        {
                            "mail": "martinlubo588@gmail.com",
                            "name": "Martin",
                            "lastname": "Lubo",
                            "age": 32,
                            "alias": "MelDev",
                            "avatar": "www.sarasa.com/img.jpg",
                            "text": "Bienvenido al chat",
                            "timestamp": "1615761918128"
                        },
                        {
                            "mail": "martinlubo588@gmail.com",
                            "name": "Martin",
                            "lastname": "Lubo",
                            "age": 32,
                            "alias": "MelDev",
                            "avatar": "www.sarasa.com/img.jpg",
                            "text": "Sed eget libero mauris. Pellentesque rutrum tellus id dictum pretium. Nunc pellentesque lobortis ex, sit amet laoreet mauris consectetur eu. Nullam dui justo, facilisis eu gravida et, bibendum facilisis odio. Pellentesque vel aliquam magna. Proin facilisis diam nisi, nec tincidunt odio accumsan vel. Nullam sollicitudin eros nibh, a finibus leo accumsan vitae. Sed sit amet odio cursus, facilisis justo vitae, faucibus libero. Quisque non nibh ut leo lacinia varius. Praesent venenatis maximus ex vel consectetur. Suspendisse potenti. Sed volutpat eleifend quam ut congue. Proin placerat risus id metus maximus, eu euismod nunc molestie. Curabitur ut consequat metus. Suspendisse potenti. In tincidunt ullamcorper nunc. ",
                            "timestamp": "1615761918128"
                        }
                    ]).then(() => console.log('Chat insertado'))
                    .catch((err) => console.log(err))
                    .finally(() => db.destroy);


            } else {
                console.log('la tabla de chat ya existe');
            }
        })
    } catch (e) {
        return e;
    }

}




export async function crearTablaProductos() {

    try {
        let db = await SqliteConnector.Get();

        db.schema.hasTable('productos').then(exists => {
            if (!exists) {
                let info = db.schema.createTable('productos', table => {
                    table.increments('id').primary();
                    table.string('nombre', 40);
                    table.string('descripcion', 200);
                    table.integer('precio');
                    table.string('codigo', 40);
                    table.integer('stock');
                    table.string('foto', 200);
                    table.string('timestamp');
                })
                    .then(() => console.log('tabla productos creada'))
                    .catch((err) => console.log(err))
                    .finally(() => db.destroy);

                db('productos')
                    .insert([
                        {
                            "nombre": "Forerunner 35",
                            "descripcion": "Reloj GPS para correr fácil de usar con medición de frecuencia cardiaca en la muñeca",
                            "precio": 25999,
                            "codigo": "GRM0002",
                            "stock": 23,
                            "foto": "https://garmin.com.ar/Image/0/450_450-010-01689-03_1.jpg",
                            "timestamp": 1615761918128
                        },
                        {
                            "nombre": "Forerunner 45",
                            "descripcion": "Reloj de carrera con GPS que admite planes de entrenamiento de Garmin Coach",
                            "precio": 32999,
                            "codigo": "GRM0005",
                            "stock": 54,
                            "foto": "https://garmin.com.ar/Image/0/450_450-010-02156-01_1.jpg",
                            "timestamp": 1615761918128
                        },
                        {
                            "nombre": "Forerunner 235",
                            "descripcion": "Reloj GPS para correr fácil de usar con medición de frecuencia cardiaca en la muñeca",
                            "precio": 37999,
                            "codigo": "GRM0010",
                            "stock": 4,
                            "foto": "https://garmin.com.ar/Image/0/450_450-010-03717-54_1.jpg",
                            "timestamp": 1615761918128
                        },
                        {
                            "nombre": "Instinct Tactical",
                            "descripcion": "Reloj GPS para correr fácil de usar con medición de frecuencia cardiaca en la muñeca",
                            "precio": 42999,
                            "codigo": "GRM0287",
                            "stock": 8,
                            "foto": "https://garmin.com.ar/Image/0/450_450-010-02064-70_1.jpg",
                            "timestamp": 1615761918128
                        },
                        {
                            "nombre": "Instinct Solar Tactical",
                            "descripcion": "Reloj GPS para correr fácil de usar con medición de frecuencia cardiaca en la muñeca",
                            "precio": 75999,
                            "codigo": "GRM0106",
                            "stock": 16,
                            "foto": "https://garmin.com.ar/Image/0/450_450-010-02293-06_1.jpg",
                            "timestamp": 1615761918128
                        },
                        {
                            "nombre": "Fenix 6S Pro Solar",
                            "descripcion": "Reloj GPS para correr fácil de usar con medición de frecuencia cardiaca en la muñeca",
                            "precio": 149999,
                            "codigo": "GRM0051",
                            "stock": 2,
                            "foto": "https://garmin.com.ar/Image/0/450_450-010-02409-13_1.jpg",
                            "timestamp": 1615761918128
                        },
                        {
                            "nombre": "Venu SQ",
                            "descripcion": "Reloj GPS para correr fácil de usar con medición de frecuencia cardiaca en la muñeca",
                            "precio": 33999,
                            "codigo": "GRM0046",
                            "stock": 104,
                            "foto": "https://garmin.com.ar/Image/0/450_450-010-02427-11_1.jpg",
                            "timestamp": 1615761918128
                        },
                        {
                            "nombre": "Swim 2",
                            "descripcion": "Reloj GPS para correr fácil de usar con medición de frecuencia cardiaca en la muñeca",
                            "precio": 40999,
                            "codigo": "GRM0067",
                            "stock": 15,
                            "foto": "https://garmin.com.ar/Image/0/450_450-010-02247-01_1.jpg",
                            "timestamp": 1615761918128
                        },
                        {
                            "nombre": "MARQ Driver",
                            "descripcion": "Reloj GPS para correr fácil de usar con medición de frecuencia cardiaca en la muñeca",
                            "precio": 421999,
                            "codigo": "GRM0050",
                            "stock": 3,
                            "foto": "https://garmin.com.ar/Image/0/450_450-010-02006-00.jpg",
                            "timestamp": 1615761918128
                        }
                    ]).then(() => console.log('Productos insertados'))
                    .finally(() => db.destroy);


            } else {
                console.log('la tabla de productos ya existe');
            }
        })

    } catch (error) {

    }
}