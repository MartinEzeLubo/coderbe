const axios = require('axios');

const url = "http://localhost:8080/productos"
const idAEliminar = ""

function testReadProducts(){
    axios.get(url)
    .then(res=>{
        let info = res.data.data.products
        info.forEach(element => {   
            console.log(`ID: ${element.id} - Producto: ${element.nombre}`);
        });
        console.log("-----------------------------------------------------");
    })

}


function testCreateProduct(){

    const data = {
        "nombre": "Forerunner 45",
        "descripcion": "Reloj GPS para correr fácil de usar con medición de frecuencia cardiaca en la muñeca",
        "precio": 35999,
        "codigo": "10220001",
        "stock": 10,
        "foto": "https://garmin.com.ar/Image/0/700_700-010-01689-00_1.jpg"
    }
    // const headers = {
    //     "Content-Type": "application/json"
    // }
    axios.post(url, data)
    .then(res=>{
        console.log(res.data.createProduct);
        
        console.log("-----------------------------------------------------");
    })
}


function testUpdateProducts(){

    // const data = {key: value}
    // const headers = {
    //     "Content-Type": "application/json"
    // }
    axios.get(url)
    .then(res=>{
        let info = res.data.data.products
        info.forEach(element => {   
            console.log(`ID: ${element.id} - Producto: ${element.nombre}`);
        });
    })
}

function testDeleteProducts(){
    // const data = {key: value}
    // const headers = {
    //     "Content-Type": "application/json"
    // }
    axios.get(url)
    .then(res=>{
        let info = res.data.data.products
        info.forEach(element => {   
            console.log(`ID: ${element.id} - Producto: ${element.nombre}`);
        });
    })
}








async function runTests(){
    await testReadProducts();
    await testCreateProduct();
    await testReadProducts();

}


runTests();

