import {
  LIST_PRODUCTS_CATEGORIES_FAIL,
  LIST_PRODUCTS_CATEGORIES_REQUEST,
  LIST_PRODUCTS_CATEGORIES_SUCCESS,
  LIST_PRODUCTS_FAIL,
  LIST_PRODUCTS_REQUEST,
  LIST_PRODUCTS_SUCCESS,
  LIST_YOUR_PRODUCTS_FAIL,
  LIST_YOUR_PRODUCTS_REQUEST,
  LIST_YOUR_PRODUCTS_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_FIND_FAIL,
  PRODUCT_FIND_REQUEST,
  PRODUCT_FIND_SUCCESS,
} from "../constants/productConstants";

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const yourProductListReducer = (
  state = { loading: true, yourProducts: [] },
  action
) => {
  switch (action.type) {
    case LIST_YOUR_PRODUCTS_REQUEST:
      return { loading: true };
    case LIST_YOUR_PRODUCTS_SUCCESS:
      return {
        loading: false,
        yourProducts: action.payload,
      };
    case LIST_YOUR_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ProductListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case LIST_PRODUCTS_REQUEST:
      return { loading: true };
    case LIST_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case LIST_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ProductCategoriesListReducer = (
  state = { loading: true, categories: [] },
  action
) => {
  switch (action.type) {
    case LIST_PRODUCTS_CATEGORIES_REQUEST:
      return { loading: true };
    case LIST_PRODUCTS_CATEGORIES_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };
    case LIST_PRODUCTS_CATEGORIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productFindReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PRODUCT_FIND_REQUEST:
      return { loading: true };
    case PRODUCT_FIND_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_FIND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
