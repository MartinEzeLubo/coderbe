const accountSid = 'AC0fbdfa3d67858c42feb60a8cd4a708cc';
const authToken = '074832c36af6c3160f80bb65ce77b7d6';

const client = require('twilio')(accountSid, authToken);

export function sendSMS(mensaje, destinatario){
    client.messages.create({
          body: mensaje,
          from: '+16186904292',
          to: destinatario
    })
    .then(message => console.log(message.sid))
    .catch(console.log)
}





//'+5491159617065'