const NODE_ENV = "development"; // this is the environment variable. .env
const DEVELOPMENT = require("./development");
const PRODUCTION = require("./production");

let current = DEVELOPMENT;

if (NODE_ENV == "production") {
  current = PRODUCTION;
}

module.exports = current;
