import {
  getProducts,
  sortByProducts,
  filterProducts,
} from "../redux/slices/product";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ListProduct from "../components/listProduct";

const Home = () => {
  const dispatch = useDispatch();
  const { products, checkout, sortBy, filters, isLoading } = useSelector(
    (state) => state.product
  );
  console.log(products);
  console.log(isLoading);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return <ListProduct arr={products ? products : []} />;
};

export default Home;
