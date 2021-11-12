import "./index.css";
import React from "react";
import { fCurrency } from "../../utils/formatNumber";
import { Button } from "@material-ui/core";
import moment from "moment";
import Label from "../Label";
import { Link } from "react-router-dom";

const Product = ({ data }) => {
  return (
    <Button color="primary" to={"/product/" + data.id} component={Link}>
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
