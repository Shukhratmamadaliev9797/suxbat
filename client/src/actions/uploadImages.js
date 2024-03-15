import axios from "axios";
import {
  IMAGES_COMMENT_UPLOAD_FAIL,
  IMAGES_COMMENT_UPLOAD_REQUEST,
  IMAGES_COMMENT_UPLOAD_SUCCESS,
  IMAGES_LIST_FAIL,
  IMAGES_LIST_REQUEST,
  IMAGES_LIST_SUCCESS,
  IMAGES_UPLOAD_FAIL,
  IMAGES_UPLOAD_REQUEST,
  IMAGES_UPLOAD_SUCCESS,
} from "../constants/uploadImagesConstants";

export const uploadImages = (formData, path) => {
  return async (dispatch, getState) => {
    dispatch({ type: IMAGES_UPLOAD_REQUEST, payload: { formData, path } });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.post("/uploadMedia", formData, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: IMAGES_UPLOAD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: IMAGES_UPLOAD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const uploadCommentImages = (formData, path) => {
  return async (dispatch, getState) => {
    dispatch({
      type: IMAGES_COMMENT_UPLOAD_REQUEST,
      payload: { formData, path },
    });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.post("/uploadMedia", formData, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: IMAGES_COMMENT_UPLOAD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: IMAGES_COMMENT_UPLOAD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listImages = (path, sort, max) => {
  return async (dispatch, getState) => {
    dispatch({ type: IMAGES_LIST_REQUEST, payload: path, sort, max });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.post(
        "/listImages",
        { path, sort, max },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: IMAGES_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: IMAGES_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
