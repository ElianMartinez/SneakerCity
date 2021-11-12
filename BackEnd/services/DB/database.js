const dataset = require("./dataset_copy.json");
const path = require("path");
const fs = require("fs");

const rutaDelArchivo = path.join(__dirname, "dataset_copy.json");

const readFile = () => {
  return dataset;
  // el evento end se lanza cuando se ha finalizado la lectura del archivo
};

const saveChange = (data) => {
  try {
    const writeStream = fs.createWriteStream(rutaDelArchivo);
    writeStream.write(data);
    return true;
  } catch (er) {
    return false;
  }
};

async function main(a) {
  return dataset[a];
}

module.exports = { main, readFile, saveChange };
