import { sum, map, filter, uniqBy } from "lodash";
import { createSlice } from "@reduxjs/toolkit";
// utils

import axios from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  products: [],
  product: {},
  sortBy: null,
  filters: {
    gender: [],
    category: "All",
    colors: [],
    priceRange: "",
    rating: "",
  },
  checkout: {
    activeStep: 0,
    cart: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
    billing: null,
  },
};

const slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },

    // GET PRODUCT
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },

    //  SORT & FILTER PRODUCTS
    sortByProducts(state, action) {
      state.sortBy = action.payload;
    },

    filterProducts(state, action) {
      state.filters.gender = action.payload.gender;
      state.filters.category = action.payload.category;
      state.filters.colors = action.payload.colors;
      state.filters.priceRange = action.payload.priceRange;
      state.filters.rating = action.payload.rating;
    },

    // CHECKOUT
    getCart(state, action) {
      const cart = action.payload;
      console.log(cart);

      const subtotal = sum(
        cart.map((_product) =>
          _product.quantity
            ? _product.quantity * _product.precio
            : _product.precio
        )
      );

      const discount = cart.length === 0 ? 0 : state.checkout.discount;
      const shipping = cart.length === 0 ? 0 : state.checkout.shipping;
      const billing = cart.length === 0 ? null : state.checkout.billing;

      state.checkout.cart = cart;
      state.checkout.discount = discount;
      state.checkout.shipping = shipping;
      state.checkout.billing = billing;
      state.checkout.subtotal = subtotal;
      state.checkout.total = subtotal - discount;
    },

    addCart(state, action) {
      const product = action.payload;
      const isEmptyCart = state.checkout.cart.length === 0;
      let newProduct = {};

      if (isEmptyCart) {
        newProduct = { ...product, quantity: 1, total: product.precio };
        state.checkout.cart = [...state.checkout.cart, newProduct];
      } else {
        state.checkout.cart = map(state.checkout.cart, (_product) => {
          const isExisted = _product.id === product.id;
          if (isExisted) {
            return {
              ..._product,
              quantity: _product.quantity + 1,
              total: product.quantity * product.precio,
            };
          }
          return { ..._product, quantity: 1, total: _product.precio };
        });
      }

      state.checkout.cart = uniqBy(
        [
          ...state.checkout.cart,
          { ...product, quantity: 1, total: product.precio },
        ],
        "id"
      );
    },

    deleteCart(state, action) {
      const updateCart = filter(
        state.checkout.cart,
        (item) => item.id !== action.payload
      );
      state.checkout.cart = updateCart;
    },

    resetCart(state) {
      state.checkout.activeStep = 0;
      state.checkout.cart = [];
      state.checkout.total = 0;
      state.checkout.subtotal = 0;
      state.checkout.discount = 0;
      state.checkout.shipping = 0;
      state.checkout.billing = null;
    },

    onBackStep(state) {
      state.checkout.activeStep -= 1;
    },

    onNextStep(state) {
      state.checkout.activeStep += 1;
    },

    onGotoStep(state, action) {
      const goToStep = action.payload;
      state.checkout.activeStep = goToStep;
    },

    increaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = map(state.checkout.cart, (product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity ? product.quantity + 1 : 2,
            total: product.total + product.precio,
          };
        }
        return product;
      });
      state.checkout.cart = updateCart;
    },

    decreaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = map(state.checkout.cart, (product) => {
        if (product.id === productId) {
          if (product.quantity > 1) {
            return {
              ...product,
              quantity: product.quantity - 1,
              total: product.total - product.precio,
            };
          }
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    createBilling(state, action) {
      state.checkout.billing = action.payload;
    },

    applyDiscount(state, action) {
      const discount = action.payload;
      state.checkout.discount = discount;
      state.checkout.total = state.checkout.subtotal - discount;
    },

    applyShipping(state, action) {
      const shipping = action.payload;
      state.checkout.shipping = shipping;
      state.checkout.total =
        state.checkout.subtotal - state.checkout.discount + shipping;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getCart,
  addCart,
  resetCart,
  onGotoStep,
  onBackStep,
  onNextStep,
  deleteCart,
  createBilling,
  applyShipping,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
  sortByProducts,
  filterProducts,
} = slice.actions;

// ----------------------------------------------------------------------

export function getProducts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/product");
      dispatch(slice.actions.getProductsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getProduct(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/product/" + id);
      console.log(response);
      dispatch(slice.actions.getProductSuccess(response.data.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
