import "./index.css";
import { fCurrency } from "../../utils/formatNumber";
import { Button } from "@material-ui/core";
import {
  decreaseQuantity,
  increaseQuantity,
  getCart,
  deleteCart,
  resetCart,
} from "../../redux/slices/product";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

const ShoppingProduct = ({ obj }) => {
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.product);
  const { cart } = checkout;
  const up = () => {
    dispatch(increaseQuantity(obj.id));
  };
  const deleteCa = () => {
    dispatch(deleteCart(obj.id));
  };
  const down = () => {
    if (obj.quantity > 1) {
      dispatch(decreaseQuantity(obj.id));
    } else {
      if (cart.length > 1) {
        deleteCa();
      } else {
        dispatch(resetCart());
      }
    }
  };

  React.useEffect(() => {
    dispatch(getCart(cart));
  }, [dispatch, cart]);
  return (
    <div className="Cart-Items">
      <div className="image-box">
        <img src={obj.image} style={{ height: "120px" }} />
      </div>
      <div className="about">
        <h1 className="title">{obj.marca + " " + obj.modelo}</h1>
        <br />
        <h3 className="subtitle"> Size: {obj.size}</h3>
      </div>
      <div className="counter">
        <Button
          onClick={() => {
            up();
          }}
          variant="contained"
        >
          +
        </Button>
        <div className="count"> {obj.quantity ? obj.quantity : 1}</div>
        <Button onClick={down} variant="contained">
          -
        </Button>
      </div>
      <div className="prices">
        <div className="amount">{fCurrency(obj.total)}</div>
        <div className="save">
          <p>{fCurrency(obj.precio)}</p>
        </div>

        <div className="remove">
          <Button color="error" variant="contained" onClick={() => deleteCa()}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingProduct;
