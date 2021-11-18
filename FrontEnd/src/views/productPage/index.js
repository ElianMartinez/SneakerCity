import { useParams } from "react-router";
import "./index.css";
import { Link, Button, Grow } from "@material-ui/core";
import { getProduct, addCart, changeActive } from "../../redux/slices/product";
import { useDispatch, useSelector } from "react-redux";
import { fCurrency } from "../../utils/formatNumber";
import React from "react";
import moment from "moment";

const ProductPage = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const [selection, setSeletion] = React.useState({});
  const { product } = useSelector((state) => state.product);

  React.useEffect(() => {
    dispatch(getProduct(id));
  }, [id, dispatch]);
  const addSelection = (t) => {
    setSeletion(t);
  };

  return (
    <>
      <Link noWrap href="/" target="" sx={{ display: "table" }}>
        <Button variant="contained">Volver</Button>
      </Link>
      <Grow in>
        <div className="container">
          <div className="left-column">
            <img className="active" src={product.image} />
          </div>
          {/* <!-- Right Column --> */}
          <div className="right-column">
            {/* <!-- Product Description --> */}
            <div className="product-description">
              <span>{product.marca}</span>
              <h1>{product.marca + " " + product.modelo}</h1>
              <p>{product.descripcion}</p>
            </div>

            {/* <!-- Product Configuration --> */}
            <span>Fecha de salida: {moment(product.fecha).format("LL")}</span>
            <div
              style={{ marginBottom: "30px" }}
              className="product-configuration"
            >
              {/* <!--  tallas --> */}
              <div className="cable-config">
                <span>Size</span>

                <div className="cable-choose">
                  {product.tallas
                    ? product.tallas.map((talla, i) => {
                        if (talla.stock > 0) {
                          return (
                            <button
                              onClick={() => {
                                addSelection(talla);
                              }}
                              key={i}
                            >
                              {talla.talla + " en Stock (" + talla.stock + ")"}
                            </button>
                          );
                        } else {
                          return (
                            <button disabled="disabled" className="out" key={i}>
                              {talla.talla + " Agotado"}
                            </button>
                          );
                        }
                      })
                    : ""}
                  <button
                    style={{ backgroundColor: "orange", color: "white" }}
                    onClick={() => {
                      setSeletion({});
                    }}
                  >
                    limpiar
                  </button>
                </div>
              </div>
            </div>

            {/* <!-- Product Pricing --> */}
            <div className="product-price">
              <span>{fCurrency(product.precio)}</span>
              <Button
                disabled={!selection.talla}
                variant="contained"
                onClick={() => {
                  const newId = product.id + "#" + selection.talla;
                  const newObj = {
                    ...product,
                    id: newId,
                    stock: selection.stock,
                    size: selection.talla,
                  };
                  dispatch(addCart(newObj));
                  dispatch(changeActive(true));
                  setSeletion({});
                }}
                className="cart-btn"
              >
                Agregar al Carrito{" "}
                {selection.talla ? "Size:" + selection.talla : ""}
              </Button>
            </div>
          </div>
        </div>
      </Grow>
    </>
  );
};

export default ProductPage;
