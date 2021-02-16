const socket = io();


socket.on('updateProducts', info =>{
    console.log("test cliente");
    renderList(info);

});

function renderList(data){
    console.log(data);
    let tbody = ``;

    data.forEach(element => {
        let row = `<tr>
        <td class="align-middle">${element.title}</td>
        <td class="align-middle">${element.price}</td>
        <td class="align-middle"><img src=${element.thumbnail} alt="" style="width: 100px; height: 100px"></td>
        </tr>`
        
        tbody = tbody + row;
    });
    
    let table = `<thead>
                    <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Imagen</th>
                    </tr>
                </thead>
                <tbody> 
                    ${tbody}            
                </tbody>`

    
    document.getElementById('productList').innerHTML = table;
};

function saveProduct(data){
    console.log(document.getElementById(title).value);


    let payload = {
        title: document.getElementById(title).value,
        price: document.getElementById(price).value,
        thumbnail: document.getElementById(thumbnail).value
    }

    socket.emit('new-product', payload);
    return false;
}