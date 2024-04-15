import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_RESET,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_FIND_REQUEST,
  USER_FIND_SUCCESS,
  USER_FIND_FAIL,
  USER_PASSWORD_CHANGE_REQUEST,
  USER_PASSWORD_CHANGE_SUCCESS,
  USER_PASSWORD_CHANGE_FAIL,
  PROFILE_DETAILS_REQUEST,
  PROFILE_DETAILS_SUCCESS,
  PROFILE_DETAILS_FAIL,
  PROFILE_PICTURE_UPDATE_REQUEST,
  PROFILE_PICTURE_UPDATE_SUCCESS,
  PROFILE_PICTURE_UPDATE_FAIL,
  PROFILE_PICTURE_UPDATE_RESET,
  PROFILE_COVER_UPDATE_REQUEST,
  PROFILE_COVER_UPDATE_SUCCESS,
  PROFILE_COVER_UPDATE_FAIL,
  PROFILE_COVER_UPDATE_RESET,
  PROFILE_DETAILS_UPDATE_REQUEST,
  PROFILE_DETAILS_UPDATE_SUCCESS,
  PROFILE_DETAILS_UPDATE_FAIL,
  PROFILE_DETAILS_UPDATE_RESET,
  PROFILE_ADD_FRIEND_REQUEST,
  PROFILE_ADD_FRIEND_SUCCESS,
  PROFILE_ADD_FRIEND_FAIL,
  PROFILE_ADD_FRIEND_RESET,
  PROFILE_CANCEL_REQUEST_REQUEST,
  PROFILE_CANCEL_REQUEST_SUCCESS,
  PROFILE_CANCEL_REQUEST_FAIL,
  PROFILE_CANCEL_REQUEST_RESET,
  USER_SEARCH_REQUEST,
  USER_SEARCH_SUCCESS,
  USER_SEARCH_FAIL,
  USER_ADD_SEARCH_HISTORY_REQUEST,
  USER_ADD_SEARCH_HISTORY_SUCCESS,
  USER_ADD_SEARCH_HISTORY_FAIL,
  USER_GET_SEARCH_HISTORY_REQUEST,
  USER_GET_SEARCH_HISTORY_SUCCESS,
  USER_GET_SEARCH_HISTORY_FAIL,
  USER_REMOVE_SEARCH_HISTORY_REQUEST,
  USER_REMOVE_SEARCH_HISTORY_SUCCESS,
  USER_REMOVE_SEARCH_HISTORY_FAIL,
  USER_GET_FRIENDS_INFO_REQUEST,
  USER_GET_FRIENDS_INFO_SUCCESS,
  USER_GET_FRIENDS_INFO_FAIL,
  USER_PASSWORD_CHANGE_RESET,
  PROFILE_DELETE_FRIEND_REQUEST_REQUEST,
  PROFILE_DELETE_FRIEND_REQUEST_SUCCESS,
  PROFILE_DELETE_FRIEND_REQUEST_FAIL,
  PROFILE_DELETE_FRIEND_REQUEST_RESET,
  PROFILE_ACCEPT_FRIEND_REQUEST_REQUEST,
  PROFILE_ACCEPT_FRIEND_REQUEST_SUCCESS,
  PROFILE_ACCEPT_FRIEND_REQUEST_FAIL,
  PROFILE_ACCEPT_FRIEND_REQUEST_RESET,
  USER_SUGGEST_FRIENDS_REQUEST,
  USER_SUGGEST_FRIENDS_SUCCESS,
  USER_SUGGEST_FRIENDS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
} from "../constants/userConstants";

export const userRegisterReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const userSignInReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const userFindReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FIND_REQUEST:
      return { loading: true };
    case USER_FIND_SUCCESS:
      return { loading: false, user: action.payload, success: true };
    case USER_FIND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userPasswordChangeReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PASSWORD_CHANGE_REQUEST:
      return { loading: true };
    case USER_PASSWORD_CHANGE_SUCCESS:
      return { loading: false, success: true, message: action.payload.message };
    case USER_PASSWORD_CHANGE_FAIL:
      return { loading: false, error: action.payload };
    case USER_PASSWORD_CHANGE_RESET:
      return {};
    default:
      return state;
  }
};

export const profileDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_DETAILS_REQUEST:
      return { loading: true };
    case PROFILE_DETAILS_SUCCESS:
      return {
        loading: false,
        profile: action.payload.profile,
        posts: action.payload.posts,
        friendship: action.payload.friendship,
      };
    case PROFILE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
        notProfile: action.payload,
      };
    default:
      return state;
  }
};

export const profilePictureUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_PICTURE_UPDATE_REQUEST:
      return { loading: true };
    case PROFILE_PICTURE_UPDATE_SUCCESS:
      return { loading: false, success: "pictureSuccess" };
    case PROFILE_PICTURE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PROFILE_PICTURE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const profileCoverUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_COVER_UPDATE_REQUEST:
      return { loading: true };
    case PROFILE_COVER_UPDATE_SUCCESS:
      return { loading: false, success: "coverSuccess" };
    case PROFILE_COVER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PROFILE_COVER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const profileDetailsUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_DETAILS_UPDATE_REQUEST:
      return { loading: true };
    case PROFILE_DETAILS_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        profile: action.payload,
      };
    case PROFILE_DETAILS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PROFILE_DETAILS_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const profileFriendAddReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_ADD_FRIEND_REQUEST:
      return { loading: true };
    case PROFILE_ADD_FRIEND_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PROFILE_ADD_FRIEND_FAIL:
      return { loading: false, error: action.payload };
    case PROFILE_ADD_FRIEND_RESET:
      return {};
    default:
      return state;
  }
};

export const profileFriendRequestCancelReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_CANCEL_REQUEST_REQUEST:
      return { loading: true };
    case PROFILE_CANCEL_REQUEST_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PROFILE_CANCEL_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    case PROFILE_CANCEL_REQUEST_RESET:
      return {};
    default:
      return state;
  }
};

export const profileDeleteFriendRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_DELETE_FRIEND_REQUEST_REQUEST:
      return { loading: true };
    case PROFILE_DELETE_FRIEND_REQUEST_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PROFILE_DELETE_FRIEND_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    case PROFILE_DELETE_FRIEND_REQUEST_RESET:
      return {};
    default:
      return state;
  }
};
export const profileAcceptFriendRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_ACCEPT_FRIEND_REQUEST_REQUEST:
      return { loading: true };
    case PROFILE_ACCEPT_FRIEND_REQUEST_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PROFILE_ACCEPT_FRIEND_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    case PROFILE_ACCEPT_FRIEND_REQUEST_RESET:
      return {};
    default:
      return state;
  }
};

export const userSearchReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SEARCH_REQUEST:
      return { loading: true };
    case USER_SEARCH_SUCCESS:
      return { loading: false, results: action.payload };
    case USER_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userAddSearchHistoryReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADD_SEARCH_HISTORY_REQUEST:
      return { loading: true };
    case USER_ADD_SEARCH_HISTORY_SUCCESS:
      return { loading: false, success: true };
    case USER_ADD_SEARCH_HISTORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userGetSearchHistoryReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case USER_GET_SEARCH_HISTORY_REQUEST:
      return { loading: true };
    case USER_GET_SEARCH_HISTORY_SUCCESS:
      return { loading: false, histories: action.payload };
    case USER_GET_SEARCH_HISTORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userSuggestFriendsReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case USER_SUGGEST_FRIENDS_REQUEST:
      return { loading: true };
    case USER_SUGGEST_FRIENDS_SUCCESS:
      return { loading: false, suggests: action.payload };
    case USER_SUGGEST_FRIENDS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userRemoveSearchHistoryReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REMOVE_SEARCH_HISTORY_REQUEST:
      return { loading: true };
    case USER_REMOVE_SEARCH_HISTORY_SUCCESS:
      return { loading: false, success: true };
    case USER_REMOVE_SEARCH_HISTORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userGetFriendsInfoReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case USER_GET_FRIENDS_INFO_REQUEST:
      return { loading: true };
    case USER_GET_FRIENDS_INFO_SUCCESS:
      return {
        loading: false,
        user: action.payload.user,
        friends: action.payload.friends,
        requests: action.payload.requests,
        followers: action.payload.followers,
        following: action.payload.following,
        sentRequests: action.payload.sentRequests,
      };
    case USER_GET_FRIENDS_INFO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
