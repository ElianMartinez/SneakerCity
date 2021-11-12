const { getProducts, getProduct, CompleteCheckout } = require("./model");

const getAll = async (req, res) => {
  let data = [];
  setTimeout(async () => {
    data = await getProducts(10);
    res.json({ data: data, error: false });
  }, 500);
};

const Post = async (req, res) => {
  const { data } = req.body;
  if (Array.isArray(data)) {
    const Idata = await CompleteCheckout(data);
    res.json({ data: Idata, error: false });
  } else {
    res.status(400).json({ data: "", error: false });
  }
};

const get = async (req, res) => {
  const { id } = req.params;
  const val = new RegExp("^[0-9]*$", "gm");
  if (val.test(id)) {
    const product = await getProduct(id);
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

module.exports = { getAll, get, Post };
