import "./index.css";
import React from "react";
import { fCurrency } from "../../utils/formatNumber";
import { Button } from "@material-ui/core";
import moment from "moment";
import Label from "../Label";
import { useDispatch } from "react-redux";
import { addCart } from "../../redux/slices/product";

const Product = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => {
        dispatch(addCart(data));
      }}
    >
      <figure className="product">
        <img src={data.image} alt="sample108" />
        <figcaption>
          <h4>{data.marca + " " + data.modelo}</h4>
          <br></br>
          <p style={{ fontSize: "45px", fontWeight: "bold" }}>
            {fCurrency(data.precio)}
          </p>
          <Label
            style={{ position: "absolute", top: "10px", right: "10px" }}
            color="success"
          >
            {moment(data.fecha).fromNow(false)}
          </Label>
        </figcaption>
      </figure>
    </Button>
  );
};

export default React.memo(Product);
