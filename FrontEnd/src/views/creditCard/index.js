import "./index.css";
import { CheckoutDone } from "../../redux/slices/product";
import { useDispatch, useSelector } from "react-redux";
import { Link, Button } from "@material-ui/core";
import React from "react";
const CreditCard = () => {
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.product);
  React.useEffect(() => {
    if (checkout.cart.length === 0) {
      window.location = "/";
    }
  }, [checkout.cart]);
  return (
    <>
      <Link href="/">
        <Button variant="contained">Volver</Button>
      </Link>
      <h1 style={{ textAlign: "center" }}>Proceso de pago. </h1>
      <div className="demo">
        <form method="post" action="#" className="payment-card">
          <div className="bank-card">
            <div className="bank-card__side bank-card__side_front">
              <div className="bank-card__inner">
                <label className="bank-card__label bank-card__label_holder">
                  <span className="bank-card__hint">Nombre</span>
                  <input
                    type="text"
                    className="bank-card__field"
                    placeholder="Nombre"
                    pattern="[A-Za-z, ]{2,}"
                    name="holder-card"
                    required
                  />
                </label>
              </div>
              <div className="bank-card__inner">
                <label className="bank-card__label bank-card__label_number">
                  <span className="bank-card__hint">Numero de tarjeta</span>
                  <input
                    type="text"
                    className="bank-card__field"
                    placeholder="Numero de tarjeta"
                    pattern="[0-9]{16}"
                    name="number-card"
                    required
                  />
                </label>
              </div>
              <div className="bank-card__inner">
                <span className="bank-card__caption">validar</span>
              </div>
              <div className="bank-card__inner bank-card__footer">
                <label className="bank-card__label bank-card__month">
                  <span className="bank-card__hint">Mes</span>
                  <input
                    type="text"
                    className="bank-card__field"
                    placeholder="MM"
                    maxLength="2"
                    pattern="[0-9]{2}"
                    name="mm-card"
                    required
                  />
                </label>
                <span className="bank-card__separator">/</span>
                <label className="bank-card__label bank-card__year">
                  <span className="bank-card__hint">Año</span>
                  <input
                    type="text"
                    className="bank-card__field"
                    placeholder="YY"
                    maxLength="2"
                    pattern="[0-9]{2}"
                    name="year-card"
                    required
                  />
                </label>
              </div>
            </div>
            <div className="bank-card__side bank-card__side_back">
              <div className="bank-card__inner">
                <label className="bank-card__label bank-card__cvc">
                  <span className="bank-card__hint">CVC</span>
                  <input
                    type="text"
                    className="bank-card__field"
                    placeholder="CVC"
                    maxLength="3"
                    pattern="[0-9]{3}"
                    name="cvc-card"
                    required
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="payment-card__footer">
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(CheckoutDone(checkout.cart));
              }}
              className="payment-card__button"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreditCard;
