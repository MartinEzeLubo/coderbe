import * as database from '../repositories/dbSelection.repository';

async function listarMensaje(id?:string){
    try {
      return await database.db.readMessage(id);
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
    data = await database.db.createMessage(sender, message);
    return data;
} catch (err) {
    throw err;
}
}

export {listarMensaje, guardarMensaje};