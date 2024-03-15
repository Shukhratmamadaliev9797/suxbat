import {
  POST_COMMENT_FAIL,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_RESET,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_RESET,
  POST_DELETE_SUCCESS,
  POST_LIST_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_REACT_FAIL,
  POST_REACT_REQUEST,
  POST_REACT_RESET,
  POST_REACT_SUCCESS,
  POST_SAVE_FAIL,
  POST_SAVE_REQUEST,
  POST_SAVE_SUCCESS,
} from "../constants/postConstants";

export const postCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return { loading: true };
    case POST_CREATE_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case POST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case POST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const postAllReducer = (
  state = { loading: false, posts: [] },
  action
) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return { ...state, loading: true };
    case POST_LIST_SUCCESS:
      return { loading: false, posts: action.payload };
    case POST_LIST_FAIL:
      return { loading: false, error: action.payload };
    case POST_CREATE_SUCCESS:
      return { ...state, posts: [action.payload, ...state.posts] }; // Assuming POST_CREATE_SUCCESS is the action type for creating a new post
    default:
      return state;
  }
};

export const postReactReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_REACT_REQUEST:
      return { loading: true };
    case POST_REACT_SUCCESS:
      return { loading: false, success: true };
    case POST_REACT_FAIL:
      return { loading: false, error: action.payload };
    case POST_REACT_RESET:
      return {};
    default:
      return state;
  }
};

export const writeCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_COMMENT_REQUEST:
      return { loading: true };
    case POST_COMMENT_SUCCESS:
      return { loading: false, success: true, comments: action.payload };
    case POST_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postSaveReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_SAVE_REQUEST:
      return { loading: true };
    case POST_SAVE_SUCCESS:
      return { loading: false, success: true };
    case POST_SAVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_DELETE_REQUEST:
      return { loading: true };
    case POST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case POST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case POST_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
