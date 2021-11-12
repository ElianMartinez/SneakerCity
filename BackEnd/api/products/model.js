const { main, readFile, saveChange } = require("../../services/DB/database");

const getProducts = async (limit) => {
  const data = await main("product");
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
  const data = await main("product");
  let result = {};
  for (let a of data) {
    if (a.id == id) {
      result = a;
      break;
    }
  }
  return result;
};

const CompleteCheckout = async (arr) => {
  const rd = readFile();
  const jsonComplete = rd;
  var newArr = {};

  arr.forEach((ele) => {
    newArr = jsonComplete.product.map((item) => {
      let obj = item;
      if (item.id == ele.id.split("#")[0]) {
        item.tallas.some((a, i) => {
          if (a.talla == ele.id.split("#")[1]) {
            obj.tallas[i].stock -= ele.quantity;
          }
        });
        return obj;
      }
      return item;
    });
  });

  const jsonEncode = {
    product: newArr,
    users: [],
  };

  return saveChange(JSON.stringify(jsonEncode));
};


module.exports = { getProducts, getProduct, CompleteCheckout };
