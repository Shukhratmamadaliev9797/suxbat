import {
  MESSAGES_CREATE_FAIL,
  MESSAGES_CREATE_REQUEST,
  MESSAGES_CREATE_RESET,
  MESSAGES_CREATE_SUCCESS,
  MESSAGES_LIST_FAIL,
  MESSAGES_LIST_REQUEST,
  MESSAGES_LIST_SUCCESS,
} from "../constants/messageConstants";

export const messageListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case MESSAGES_LIST_REQUEST:
      return { loading: true };
    case MESSAGES_LIST_SUCCESS:
      return {
        loading: false,
        messagesLists: action.payload,
      };
    case MESSAGES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const messageCreateReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case MESSAGES_CREATE_REQUEST:
      return { loading: true };
    case MESSAGES_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload,
      };
    case MESSAGES_CREATE_FAIL:
      return { loading: false, error: action.payload.message };
    case MESSAGES_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
