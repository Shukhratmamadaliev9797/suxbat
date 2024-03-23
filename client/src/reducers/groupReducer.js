import {
  GROUP_ADD_POST_FAIL,
  GROUP_ADD_POST_REQUEST,
  GROUP_ADD_POST_SUCCESS,
  GROUP_CREATE_FAIL,
  GROUP_CREATE_REQUEST,
  GROUP_CREATE_RESET,
  GROUP_CREATE_SUCCESS,
  GROUP_FIND_FAIL,
  GROUP_FIND_REQUEST,
  GROUP_FIND_SUCCESS,
  GROUP_JOIN_FAIL,
  GROUP_JOIN_REQUEST,
  GROUP_JOIN_SUCCESS,
  GROUP_LEAVE_FAIL,
  GROUP_LEAVE_REQUEST,
  GROUP_LEAVE_SUCCESS,
  LIST_YOUR_GROUPS_FAIL,
  LIST_YOUR_GROUPS_REQUEST,
  LIST_YOUR_GROUPS_SUCCESS,
  SEARCH_GROUP_FAIL,
  SEARCH_GROUP_REQUEST,
  SEARCH_GROUP_SUCCESS,
} from "../constants/groupConstants";

export const groupCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case GROUP_CREATE_REQUEST:
      return { loading: true };
    case GROUP_CREATE_SUCCESS:
      return { loading: false, success: true };
    case GROUP_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case GROUP_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const yourGroupListReducer = (
  state = { loading: true, groups: [] },
  action
) => {
  switch (action.type) {
    case LIST_YOUR_GROUPS_REQUEST:
      return { loading: true };
    case LIST_YOUR_GROUPS_SUCCESS:
      return {
        loading: false,
        yourGroups: action.payload.yourGroups,
        joinedGroups: action.payload.joinedGroups,
      };
    case LIST_YOUR_GROUPS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const groupSearchReducer = (
  state = { loading: false, searchedGroups: [] },
  action
) => {
  switch (action.type) {
    case SEARCH_GROUP_REQUEST:
      return { loading: true };
    case SEARCH_GROUP_SUCCESS:
      return { loading: false, searchedGroups: action.payload };
    case SEARCH_GROUP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const groupJoinReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case GROUP_JOIN_REQUEST:
      return { loading: true };
    case GROUP_JOIN_SUCCESS:
      return { loading: false, success: true };
    case GROUP_JOIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const groupLeaveReducer = (state = {}, action) => {
  switch (action.type) {
    case GROUP_LEAVE_REQUEST:
      return { loading: true };
    case GROUP_LEAVE_SUCCESS:
      return { loading: false, success: true };
    case GROUP_LEAVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const groupFindReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case GROUP_FIND_REQUEST:
      return { loading: true };
    case GROUP_FIND_SUCCESS:
      return { loading: false, group: action.payload };
    case GROUP_FIND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const groupAddPostReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case GROUP_ADD_POST_REQUEST:
      return { loading: true };
    case GROUP_ADD_POST_SUCCESS:
      return { loading: false, success: true };
    case GROUP_ADD_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
