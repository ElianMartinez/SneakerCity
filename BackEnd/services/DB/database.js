const dataset = require('./dataset.json');

async function main(a) {
    return dataset[a];
}

module.exports = main;


