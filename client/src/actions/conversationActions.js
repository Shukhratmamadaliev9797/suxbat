import axios from "axios";
import {
  CONVERSATION_CREATE_FAIL,
  CONVERSATION_CREATE_REQUEST,
  CONVERSATION_CREATE_SUCCESS,
  CONVERSATION_LIST_FAIL,
  CONVERSATION_LIST_REQUEST,
  CONVERSATION_LIST_SUCCESS,
} from "../constants/conversationConstants";

export const listConversation = (userId) => {
  return async (dispatch, getState) => {
    dispatch({ type: CONVERSATION_LIST_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(`/listConversations/${userId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });

      dispatch({ type: CONVERSATION_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: CONVERSATION_LIST_FAIL, payload: error.message });
    }
  };
};

export const createConversation = (senderId, receiverId) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CONVERSATION_CREATE_REQUEST,
      payload: {
        senderId,
        receiverId,
      },
    });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.post(
        `/createConversations`,
        {
          senderId,
          receiverId,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({ type: CONVERSATION_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: CONVERSATION_CREATE_FAIL, payload: message });
    }
  };
};
