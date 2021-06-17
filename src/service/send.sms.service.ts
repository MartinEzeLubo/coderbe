const accountSid = 'AC0fbdfa3d67858c42feb60a8cd4a708cc';
const authToken = '534eb0e39a7521d9e97ae0bde0b04928';

const client = require('twilio')(accountSid, authToken);

export function sendSMS(mensaje, destinatario){
    client.messages.
    create({ 
        body: mensaje, 
        from: 'whatsapp:+14155238886',       
        to: 'whatsapp:+5491150354113' 
      })
    //create({
    //       body: 'Your Yummy Cupcakes Company order of 1 dozen frosted cupcakes has shipped and should be delivered on July 10, 2019. Details: http://www.yummycupcakes.com/',
    //       from: 'whatsapp:+14155238886',
    //       to: `whatsapp:${destinatario}`
    // })
    .then(message => console.log(message))
    .catch(console.log)
}

