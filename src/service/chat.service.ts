import {db} from '../app'
import {normalize, schema} from 'normalizr'

const util = require('util')

let userSchema = new schema.Entity('user',{},{idAttribute: 'mail'});
let mensajesSchema = new schema.Entity('mensajes',{
  author: userSchema
},{idAttribute: '_id'});
let chatSchema = new schema.Entity('chat',{
  mensajes: [mensajesSchema]
})




async function listarMensaje(id?:string){
  try {
    let messagesData = await db.readMessage(id);
    
    let data = {id: '001', mensajes: messagesData};
    
    console.log(messagesData);

    
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








