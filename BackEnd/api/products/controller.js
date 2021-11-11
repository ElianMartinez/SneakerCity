const { getProducts, getProduct } = require("./model");

const getAll = async (req, res) => {
  const data = await getProducts(10);
  res.json({ data: data, error: false });
};

const get = async (req, res) => {
  const { id } = req.params;
  const val = new RegExp("^[0-9]*$", "gm");

  if (val.test(id)) {
    const product = await getProduct(id);
    console.log(product);
    if (Object.keys(product).length == 0) {
      return res
        .status(404)
        .json({ data: "NO HAY PRODUCTOS CON ESE ID", error: true });
    } else {
      return res.json({ data: product, error: false });
    }
  } else {
    return res.status(400).json({ data: "ID NO ES VALIDO", error: true });
  }
};

module.exports = { getAll, get };
