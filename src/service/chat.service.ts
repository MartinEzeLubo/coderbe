import {chatdb} from '../db/dbSelection'
import {normalize, schema} from 'normalizr'

const util = require('util')

let userSchema = new schema.Entity('user',{},{idAttribute: 'mail'});
let mensajesSchema = new schema.Entity('mensajes',{
  author: userSchema
},{idAttribute: '_id'});
let chatSchema = new schema.Entity('chat',{
  mensajes: [mensajesSchema]
})




async function listarMensajes(id?:string){
  try {
    let messagesData = await chatdb.readMessage(id);
    
    let data = {id: '001', mensajes: messagesData};
    
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
      data = await chatdb.createMessage(data.mail, data.name, data.lastname, data.age, data.alias, data.avatar, data.text);
      return data;
  } catch (err) {
      throw err;
  }
}

export {listarMensajes, guardarMensaje}; 








