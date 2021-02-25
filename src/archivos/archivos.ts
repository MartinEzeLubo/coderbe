const fs = require('fs');



export class Archivo{

    fileName: string;
    contador = 0;

    constructor(name: string){
        this.fileName = name;
    }
  
    async read() {
        try{
            let contenido = await fs.promises.readFile(`${__dirname}/${this.fileName}.txt`, 'utf-8');
            return JSON.parse(contenido);
        } catch (err) {
            console.log(err);
        }
    }

    async save(newTitle: string, newPrice: number, newUrl: string){
        let info;
        try{
            let data = await fs.promises.readFile(`${__dirname}/${this.fileName}.txt`, 'utf-8');
            
            info = JSON.parse(data);
            let id:Number = info.length+1;
            
            let product = {'title':  newTitle,
                       'price': newPrice,
                       'thumbnail': newUrl,
                       'id': id,
            };
            info.push(product);
            
            await fs.promises.writeFile(`${__dirname}/${this.fileName}.txt`, JSON.stringify(info, null, 4));

            
            return product;
            

        } catch (err) {
            console.log(err);
            return err;
        }
    }

    async update(id: number, newTitle: string, newPrice: number, newUrl: string){
        let productos;
        let posPrdEncontrado;

        try{
            let data = await fs.promises.readFile(`${__dirname}/${this.fileName}.txt`, 'utf-8');
            
            productos = JSON.parse(data);

            for(let i = 0; i < productos.length; i++){
                if (productos[i].id === id){
                    posPrdEncontrado = i;
                    productos[i].title = newTitle;
                    productos[i].price = newPrice;
                    productos[i].thumbnail = newUrl;
                    break
                }
            }

            await fs.promises.writeFile(`${__dirname}/${this.fileName}.txt`, JSON.stringify(productos, null, 4));

            return productos[posPrdEncontrado];

        } catch (err) {
            throw err;
        }



    }
    async delete(id: number){
        let productos;

        try{
            let data = await fs.promises.readFile(`${__dirname}/${this.fileName}.txt`, 'utf-8');
            
            productos = JSON.parse(data);

            let prdEliminado = productos.splice(id-1, 1);
            
            for (let i = id-1; i<productos.length; i++){
                productos[i].id--;
            }
            await fs.promises.writeFile(`${__dirname}/${this.fileName}.txt`, JSON.stringify(productos, null, 4));

            return prdEliminado;

        } catch (err) {
            throw err;
        }



    }

    async borrarArchivo(){
        fs.unlink(`${__dirname}/${this.fileName}.txt`, (error: Error)=> {
            if (error) throw error;
        })
    }

    async saveChat(sender: string, message: string, date: string){
        let messageLog;
        try{
            let data = await fs.promises.readFile(`${__dirname}/${this.fileName}.txt`, 'utf-8');
            
            messageLog = JSON.parse(data);
            let id:Number = messageLog.length+1;
            
            let newMessage = {sender,
                       message,
                       date
            };
            messageLog.push(newMessage);
            
            await fs.promises.writeFile(`${__dirname}/${this.fileName}.txt`, JSON.stringify(messageLog, null, 4));

            
            return newMessage;
            

        } catch (err) {
            console.log(err);
            return err;
        }
    }

}

