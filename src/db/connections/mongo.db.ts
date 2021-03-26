const mongoose = require('mongoose');
export const mongoConnection = mongoose.connect('mongodb://martinlubo.ddns.net:8102/ecommerce', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('se conecto correctamente'))
.catch(error => console.log(error));


module.exports = {
    mongoConnection
}

