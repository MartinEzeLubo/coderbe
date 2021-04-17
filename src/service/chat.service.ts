import {db} from '../app'
import {normalize, schema} from 'normalizr'

const util = require('util')

let userSchema = new schema.Entity('user',{},{idAttribute: 'mail'});
let responseSchema = new schema.Object({ users: new schema.Array(userSchema) });
let mensajesSchema = new schema.Entity('mensajes',{author: responseSchema},{idAttribute: '_id'});
let chatSchema = new schema.Entity('chat',{mensajes: [mensajesSchema]},{idAttribute: 'id'})




async function listarMensaje(id?:string){
  try {
    let messagesData = await db.readMessage(id);
    
    let data = {id: 'clavesarasa', mensajes: messagesData};
    console.log(data);

    return normalize(data, chatSchema);

  } catch (error) {
    return error;
  }
  
}
   
  
async function guardarMensaje(data){
  if(!data.mail || data.mail === "" || !data.text || data.text === "") {
      return 'Los parametros enviados son incorrectos';
  }
  try {
      data = await db.createMessage(data.mail, data.name, data.lastname, data.age, data.alias, data.avatar, data.text);
      return data;
  } catch (err) {
      throw err;
  }
}

export {listarMensaje, guardarMensaje}; 









  //let cosa = {
  //   id: 'clavesarasa',
  //   mensajes: [
  //     {
  //       _id: '111111',
  //       author: {
  //         mail: 'asd@add.com', 
  //         name: 'Martin',
  //         lastname: 'Lubo',
  //         age: 32,
  //         alias: 'ML',
  //         avatar: 'url'
  //       },
  //     text: 'mensaje 1',
  //     timestamp: Date.now()
  //     },
  //     {
  //       _id: '222222',
  //       author: {
  //         mail: 'fsdfsfsfgfsd@add.com', 
  //         name: 'Martin',
  //         lastname: 'Lubo',
  //         age: 32,
  //         alias: 'ML',
  //         avatar: 'url'
  //       },
  //     text: 'mensaje 2',
  //     timestamp: Date.now()

  //     },
  //     {
  //       _id: '333333',
  //       author: {
  //         mail: 'asd@add.com', 
  //         name: 'Martin',
  //         lastname: 'Lubo',
  //         age: 32,
  //         alias: 'ML',
  //         avatar: 'url'
  //       },
  //     text: 'mensaje 3',
  //     timestamp: Date.now()
  //     }
  //   ] }
  





