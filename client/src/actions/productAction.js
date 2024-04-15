import axios from "axios";
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
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_FIND_FAIL,
  PRODUCT_FIND_REQUEST,
  PRODUCT_FIND_SUCCESS,
} from "../constants/productConstants";

export const createProduct = (
  images,
  title,
  description,
  price,
  category,
  condition,
  availability,
  location,
  user
) => {
  return async (dispatch, getState) => {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
      payload: images,
      title,
      description,
      price,
      category,
      condition,
      availability,
      location,
      user,
    });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.post(
        "/createProduct",
        {
          images,
          title,
          description,
          price,
          category,
          condition,
          availability,
          location,
          user,
        },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );

      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listYourProducts = () => {
  return async (dispatch, getState) => {
    dispatch({ type: LIST_YOUR_PRODUCTS_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(`/listYourProducts`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: LIST_YOUR_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: LIST_YOUR_PRODUCTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listProducts = ({ category = "", title = "" }) => {
  return async (dispatch, getState) => {
    dispatch({ type: LIST_PRODUCTS_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(
        `/listProducts?category=${category}&title=${title}`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: LIST_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: LIST_PRODUCTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listCategoriesProducts = () => {
  return async (dispatch, getState) => {
    dispatch({ type: LIST_PRODUCTS_CATEGORIES_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(`/categoriesProducts`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: LIST_PRODUCTS_CATEGORIES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: LIST_PRODUCTS_CATEGORIES_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const findProduct = (productId) => {
  return async (dispatch, getState) => {
    dispatch({ type: PRODUCT_FIND_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();

    try {
      const { data } = await axios.get(
        `/findProduct/${productId}`,

        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: PRODUCT_FIND_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_FIND_FAIL, payload: message });
    }
  };
};
