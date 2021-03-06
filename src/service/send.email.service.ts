const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'angel.bartoletti71@ethereal.email',
        pass: 'W286pZujKsctwhrxqB'
    }
});


export function sendMail(receptor, asunto){
    
    let mailOptions = {
        from: "Servidor Node.js",
        to: receptor,
        subject: asunto,
        html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>'
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err)
            return err
        }
        console.log(info)
    })
}



// coderbemailer@gmail.com
// Hola1234!


const transporterGmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'coderbemailer@gmail.com',
        pass: 'Hola1234!'
    }
})

export function sendMailGmail(receptor, asunto, name, fileToSend){

    let gmailOptions = {
        from: 'Servidor Node.js',
        to: receptor,
        subject: asunto,
        html: '<h1 style="color: blue;">Contenido de prueba con archivo adjunto desde <span style="color: green;">Node.js con Nodemailer mediante GMail</span></h1>',
        attachments: [
            {
                path: fileToSend
            }
        ]
    }
    transporterGmail.sendMail(gmailOptions, (err, info) => {
        if(err) {
            console.log(err)
            return err
        }
        console.log(info)
    })

}