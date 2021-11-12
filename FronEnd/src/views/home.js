import { getProducts } from "../redux/slices/product";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ListProduct from "../components/listProduct";
import SkeletonList from "../components/SkeletonList";

const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <SkeletonList arr={[1, 2, 3, 4, 5, 6, 7, 8]} />
      ) : (
        <ListProduct arr={products ? products : []} />
      )}
    </>
  );
};

export default Home;
