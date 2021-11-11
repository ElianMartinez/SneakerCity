const db = require("../../services/DB/database");

const getProducts = async (limit) => {
  const data = await db("product");
  // sort the array based on the date unintentionally {
  const newData = data.sort((a, b) => {
    //save the data on newData var
    const l1 = new Date(a.fecha).getTime();
    const l2 = new Date(b.fecha).getTime();
    return l2 - l1;
  });
  //} End sort

  //return only product's limit
  return newData.slice(0, limit);
};

const getProduct = async (id) => {
  const data = await db("product");
  let result = {};
  for (let a of data) {
    if (a.id == id) {
      result = a;
      break;
    }
  }
  return result;
};

module.exports = { getProducts, getProduct };
