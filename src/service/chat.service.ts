import {db} from '../app'

async function listarMensaje(id?:string){
    try {
      return await db.readMessage(id);
    } catch (error) {
      return error;
    }
    
  }
   
  
async function guardarMensaje(sender: string, message: string){
let data;


if(!sender || sender === "" || !message || message === "") {
    return 'Los parametros enviados son incorrectos';
}
try {
    data = await db.createMessage(sender, message);
    return data;
} catch (err) {
    throw err;
}
}

export {listarMensaje, guardarMensaje};