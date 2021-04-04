import {log} from '../models/log.model.mongo'

export class logDAO {
    
    constructor(){
        const mongoose = require('mongoose');
        const mongoConnection= mongoose.connect('mongodb://martinlubo.ddns.net:8102/conectionlogs', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
        .then(() => console.log('Log corriendo'))
        .catch(error => console.log(error));
        
    }

    async saveLog(){
        try{
            let data = Date.now();
            let nuevoLogModel = new log(data);
            nuevoLogModel.save();
        } catch (err) {
            console.log(err);
            return err;
        }
     }
}