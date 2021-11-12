import axios from "../utils/axios";
import { useEffect, useState } from "react";
import Product from "../components/product";
const Home = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios.get("/product").then((response) => {
      setProduct(response.data.data);
    });
  }, []);

  return (
    
  );
};

export default Home;
