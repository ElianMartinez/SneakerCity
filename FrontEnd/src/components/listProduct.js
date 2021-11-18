import Product from "../components/product";

const ListProduct = ({ arr }) => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
    >
      {arr.map((item) => {
        return <Product key={item.id} data={item} />;
      })}
    </div>
  );
};

export default ListProduct;
