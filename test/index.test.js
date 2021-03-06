const assert = require('assert').strict
const axios = require('axios')
const request = require('supertest')('http://localhost:8080')
const expect = require('chai').expect


const url = "http://localhost:8080/productos"
let idAEliminar;

describe("testeo de la api", function(){
    
    it('deberia existir productos', async ()=>{
            axios.get(url)
            .then(res=>{
                assert.notStrictEqual(res.data.data.products.length, 0)
            })
    })
    it('crear nuevo producto', async ()=>{
        const data = {
            "nombre": "Producto que se va a eliminar",
            "descripcion": "descripcion vieja",
            "precio": 35999,
            "codigo": "10220001",
            "stock": 10,
            "thumbnail": "https://garmin.com.ar/Image/0/700_700-010-01689-00_1.jpg"
        }
        idAEliminar = await axios.post(url, data)
        .then(res=>{
            assert.notStrictEqual(res.data.data.createProduct.id, undefined)
            return res.data.data.createProduct.id
        })        
    })
    it('Actualizar descripcion del producto', async ()=>{
        const data = {
            "id": `${idAEliminar}`,
            "nombre": "Producto que se va a eliminar",
            "descripcion": "descripcion nueva",
            "precio": 35999,
            "codigo": "10220001",
            "stock": 10,
            "foto": "https://garmin.com.ar/Image/0/700_700-010-01689-00_1.jpg"
        }
        await axios.put(url, data)
        .then(res=>{
            assert.strictEqual(res.data.descripcion, "descripcion nueva")
        })        
    })
    it('Encontrar el producto creado en el test anterior',async ()=>{
        await axios.get(`${url}/?id=${idAEliminar}`)
        .then(res=>{
            assert.strictEqual(res.data.data.product.id, idAEliminar)
        })
    })    
    it('Eliminar el producto creado',async ()=>{
        await axios.delete(`${url}/${idAEliminar}`)
        .then(res=>{
            assert.strictEqual(res.data._id, idAEliminar)
        })
    })
})

describe("SUPERTEST - testeo de la api con supertest", function(){
    
    it('SUPERTEST - Status 200',async ()=>{
            let response = await request.get('/productos')
            expect(response.status).to.eql(200)
            
    })
    it('SUPERTEST - crear nuevo producto', async ()=>{
        const data = {
            "nombre": "Producto que se va a eliminar",
            "descripcion": "descripcion vieja",
            "precio": 35999,
            "codigo": "10220001",
            "stock": 10,
            "thumbnail": "https://garmin.com.ar/Image/0/700_700-010-01689-00_1.jpg"
        }
        idAEliminar = await request.post('/productos').send(data)
        .then(res=>{
            expect(res.body.data.createProduct.id).to.not.eql(undefined)
            return res.body.data.createProduct.id
        })        
    })
    it('SUPERTEST - Actualizar descripcion del producto', async ()=>{
        const data = {
            "id": `${idAEliminar}`,
            "nombre": "Producto que se va a eliminar",
            "descripcion": "descripcion nueva",
            "precio": 35999,
            "codigo": "10220001",
            "stock": 10,
            "foto": "https://garmin.com.ar/Image/0/700_700-010-01689-00_1.jpg"
        }
        await request.put('/productos').send(data)
        .then(res=>{
            expect(res.body.descripcion).to.eql("descripcion nueva")
            
        })        
    })
    it('SUPERTEST - Encontrar el producto creado en el test anterior',async ()=>{
        await request.get(`/productos/?id=${idAEliminar}`)
        .then(res=>{
            expect(res.body.data.product.id).to.eql(idAEliminar)
        })
    })    
    it('Eliminar el producto creado',async ()=>{
        await request.delete(`/productos/${idAEliminar}`)
        .then(res=>{
            expect(res.body._id).to.eql(idAEliminar)
        })
    })

})