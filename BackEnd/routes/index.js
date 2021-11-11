const express = require("express");
const router = express.Router();
// ---------------------------------------------------------------- //
// Import route files
const productRoute = require("../api/products/route");
// ----------------------------------------------------------------//

router.use("/product", productRoute);

router.get("/", function (req, res) {
  res.send("Hello Word");
});

module.exports = router;
