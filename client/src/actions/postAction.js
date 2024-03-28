import axios from "axios";
import {
  POST_COMMENT_FAIL,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_GET_REACTS_FAIL,
  POST_GET_REACTS_REQUEST,
  POST_GET_REACTS_SUCCESS,
  POST_LIST_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_REACT_FAIL,
  POST_REACT_REQUEST,
  POST_REACT_SUCCESS,
  POST_SAVE_FAIL,
  POST_SAVE_REQUEST,
  POST_SAVE_SUCCESS,
} from "../constants/postConstants";

export const createPost = (type, background, text, images, user, group) => {
  return async (dispatch, getState) => {
    dispatch({
      type: POST_CREATE_REQUEST,
      payload: type,
      background,
      text,
      images,
      user,
      group,
    });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.post(
        "/createPost",
        {
          type,
          background,
          text,
          images,
          user,
          group,
        },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );

      dispatch({ type: POST_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: POST_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const allPosts = () => {
  return async (dispatch, getState) => {
    dispatch({ type: POST_LIST_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get("/getAllPost", {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: POST_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: POST_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const reactPost = (postId, react) => {
  return async (dispatch, getState) => {
    dispatch({ type: POST_REACT_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.put(
        `/reactPost`,
        { postId, react },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: POST_REACT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: POST_REACT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const comment = async (postId, comment, image, token) => {
  try {
    const { data } = await axios.put(
      `/comment`,
      {
        postId,
        comment,
        image,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getReacts = async (postId, token) => {
  try {
    const { data } = await axios.get(
      `/getReacts/${postId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const savePost = (postId) => {
  return async (dispatch, getState) => {
    dispatch({ type: POST_SAVE_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.put(
        `/savePost/${postId}`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: POST_SAVE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: POST_SAVE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const deletePost = (postId) => {
  return async (dispatch, getState) => {
    dispatch({ type: POST_DELETE_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.delete(
        `/deletePost/${postId}`,

        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: POST_DELETE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: POST_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
