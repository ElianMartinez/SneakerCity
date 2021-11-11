import axios from "../utils/axios";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    axios.get("/product").then((response) => {
      console.log(response);
    });
  }, []);

  return <p>Hola</p>;
};

export default Home;
