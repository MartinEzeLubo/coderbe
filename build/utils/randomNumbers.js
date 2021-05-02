const createRandoms = () => {
    let numbers = process.argv[2] || 500000000;
    let data = new Map([]);
    for (let i = 0; i < numbers; i++) {
        let n = Math.floor(Math.random() * (1000 - 1)) + 1;
        if (data.has(n)) {
            let value;
            value = data.get(n);
            value++;
            data.set(n, value);
        }
        else {
            data.set(n, 1);
        }
    }
    return JSON.stringify([...data]);
};
process.on('message', msg => {
    let result = createRandoms();
    process.send(result);
});
//# sourceMappingURL=randomNumbers.js.map