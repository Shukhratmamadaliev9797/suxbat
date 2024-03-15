import {
  CONVERSATION_CREATE_FAIL,
  CONVERSATION_CREATE_REQUEST,
  CONVERSATION_CREATE_RESET,
  CONVERSATION_CREATE_SUCCESS,
  CONVERSATION_LIST_FAIL,
  CONVERSATION_LIST_REQUEST,
  CONVERSATION_LIST_SUCCESS,
} from "../constants/conversationConstants";

export const conversationListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case CONVERSATION_LIST_REQUEST:
      return { loading: true };
    case CONVERSATION_LIST_SUCCESS:
      return {
        loading: false,
        conversationLists: action.payload,
      };
    case CONVERSATION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const conversationCreateReducer = (
  state = { success: false },
  action
) => {
  switch (action.type) {
    case CONVERSATION_CREATE_REQUEST:
      return { loading: true };
    case CONVERSATION_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        conversation: action.payload,
      };
    case CONVERSATION_CREATE_FAIL:
      return { loading: false, error: action.payload.message };
    case CONVERSATION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
