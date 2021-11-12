import "./index.css";
import React from "react";
import { Slide, Dialog } from "@material-ui/core";
import ShoppingProduct from "../shoppingProduct";
import { fCurrency } from "../../utils/formatNumber";

import { resetCart, getCart } from "../../redux/slices/product";
import { useDispatch, useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ShoppingCart = ({ data, open, close }) => {
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.product);
  const { cart } = checkout;

  const deleteCartAll = () => {
    dispatch(resetCart());
  };

  React.useEffect(() => {
    dispatch(getCart(cart));
  }, [dispatch, cart]);
  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={close}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="Cart-Container">
          <div className="Header">
            <h3 className="Heading">Shopping Cart</h3>
            <h5
              onClick={() => {
                deleteCartAll();
              }}
              className="Action"
            >
              Remove all
            </h5>
          </div>
          {data.cart.map((a) => {
            return <ShoppingProduct key={a.id} obj={a} />;
          })}

          <br />
          <hr />
          <div className="checkout">
            <div className="total">
              <div>
                <div className="Subtotal">Total</div>
                <div className="items">{data.cart.length} items</div>
              </div>
              <div className="total-amount">{fCurrency(data.subtotal)}</div>
            </div>
            <button className="button">Checkout</button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ShoppingCart;
