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

