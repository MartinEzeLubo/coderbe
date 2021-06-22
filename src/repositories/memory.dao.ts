export class memoryDAO {
    
    constructor(){
        
    }
    
    async create(nombre: string, descripcion: string, precio: number, codigo: string, stock: number, foto: string){
        
        let nuevoProducto = {
            nombre,
            descripcion,
            precio,
            codigo,
            stock,
            foto,
            timestamp: Date.now()
        }
            
    }

    async read(){
        try {
            return 'read de sqlite, o algo asi.'
        } catch (error) {
            
        }
        
    }
    async update(){
        return 'no deberia aparecer esto'
        
    }
    async delete(){
        
    }

}