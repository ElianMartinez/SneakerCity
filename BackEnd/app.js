const express = require("express");
const cors = require("cors");
const { PORT } = require("./config/environments");
const router = require("./routes");
const { monit } = require("./middleware/monitoring");

const app = express();

app.use(cors());
app.use(express.json());
app.use(monit); //middleware example
app.use(router);
app.set("port", PORT);

module.exports = app;
