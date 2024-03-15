import axios from "axios";
import {
  MESSAGES_CREATE_FAIL,
  MESSAGES_CREATE_REQUEST,
  MESSAGES_CREATE_SUCCESS,
  MESSAGES_LIST_FAIL,
  MESSAGES_LIST_REQUEST,
  MESSAGES_LIST_SUCCESS,
} from "../constants/messageConstants";

export const listMessage = (conversationId) => {
  return async (dispatch, getState) => {
    dispatch({ type: MESSAGES_LIST_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(`/listMessages/${conversationId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });

      dispatch({ type: MESSAGES_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: MESSAGES_LIST_FAIL, payload: error.message });
    }
  };
};

export const createMessage = (conversationId, sender, text) => {
  return async (dispatch, getState) => {
    dispatch({
      type: MESSAGES_CREATE_REQUEST,
      payload: {
        conversationId,
        sender,
        text,
      },
    });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.post(
        `/api/createMessages`,
        {
          conversationId,
          sender,
          text,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({ type: MESSAGES_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: MESSAGES_CREATE_FAIL, payload: message });
    }
  };
};
