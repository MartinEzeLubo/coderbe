const axios = require('axios');

const url = "http://localhost:8080/productos"

async function testReadProducts(){
    await axios.get(url)
    .then(res=>{
        let info = res.data.data.products
        info.forEach(element => {   
            console.log(`ID: ${element.id} - Producto: ${element.nombre}`);
        });
        console.log("-----------------------------------------------------");
    })

}


async function testCreateProduct(){

    const data = {
        "nombre": "Producto que se va a eliminar",
        "descripcion": "descripcion vieja",
        "precio": 35999,
        "codigo": "10220001",
        "stock": 10,
        "thumbnail": "https://garmin.com.ar/Image/0/700_700-010-01689-00_1.jpg"
    }
    return id = await axios.post(url, data)
    .then(res=>{
        return res.data.data.createProduct.id
    })
}


async function testUpdateProducts(id){
    const data = {
        "id": id,
        "nombre": "Producto actualizado",
        "descripcion": "descripcion nueva",
        "precio": 35999,
        "codigo": "10220001",
        "stock": 10,
        "foto": "https://garmin.com.ar/Image/0/700_700-010-01689-00_1.jpg"
    }
    await axios.put(url, data)
}

async function testDeleteProducts(id){
    
    await axios.delete(`${url}/${id}`)
    
}





async function runTests(){
    await testReadProducts();
    let id = await testCreateProduct();
    await testReadProducts();
    await testUpdateProducts(id)
    await testReadProducts();
    await testDeleteProducts(id)
    await testReadProducts();

}


runTests();

