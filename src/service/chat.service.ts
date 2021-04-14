import {db} from '../app'
import {normalize, schema} from 'normalizr'
import { text } from 'express';


let userSchema = new schema.Entity('author',{},{idAttribute: 'mail'});
let messageSchema = new schema.Entity('messages', {
    author: userSchema,
    },{
      idAttribute: '_id'
    });
let chatSchema = new schema.Entity('chat' , [messageSchema] )


// function normalizarInfo(data){
//   console.log(data);
//   let normalizedData = normalize(messageSchema, data);
//   console.log(normalizedData);
//   return normalizedData;
// }

async function listarMensaje(id?:string){

    try {
      let mensajes = await db.readMessage(id);
      

      return mensajes;

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