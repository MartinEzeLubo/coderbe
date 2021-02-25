import {Archivo} from './archivos';

const dataSource = new Archivo('chatlog');

async function listChat(){
  try {
    let data = await dataSource.read();
    return data;
  } catch(err){
    return err;
  }
}
  
async function writeMessage(sender: string, message: string, date: string){
  let data;
  try {
    data = await dataSource.saveChat(sender, message, date)
    return data;
  } catch (err) {
    return err;
  }
}


export {listChat, writeMessage};
