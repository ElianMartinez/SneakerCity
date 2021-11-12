import "./index.css";
import React from "react";
import { fCurrency } from "../../utils/formatNumber";
import { Button } from "@material-ui/core";
import moment from "moment";
import Label from '../Label';

const Product = ({ data }) => {
  return (
    <Button
      onClick={() => {
        console.log(data.id);
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
          <Label>{data.fecha}</Label>
        </figcaption>
      </figure>
    </Button>
  );
};

export default React.memo(Product);
