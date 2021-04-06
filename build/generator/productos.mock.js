const faker = require('faker');
faker.locale = 'es';
const get = () => ({
    nombre: faker.commerce.productName(),
    descripcion: faker.commerce.productDescription(),
    precio: faker.commerce.price(),
    foto: faker.internet.url()
});
module.exports = {
    get
};
//# sourceMappingURL=productos.mock.js.map