import {
  PROFILE_ACCEPT_FRIEND_REQUEST_FAIL,
  PROFILE_ACCEPT_FRIEND_REQUEST_REQUEST,
  PROFILE_ACCEPT_FRIEND_REQUEST_SUCCESS,
  PROFILE_ADD_FRIEND_FAIL,
  PROFILE_ADD_FRIEND_REQUEST,
  PROFILE_ADD_FRIEND_SUCCESS,
  PROFILE_CANCEL_REQUEST_FAIL,
  PROFILE_CANCEL_REQUEST_REQUEST,
  PROFILE_CANCEL_REQUEST_SUCCESS,
  PROFILE_COVER_UPDATE_FAIL,
  PROFILE_COVER_UPDATE_REQUEST,
  PROFILE_COVER_UPDATE_SUCCESS,
  PROFILE_DELETE_FRIEND_REQUEST_FAIL,
  PROFILE_DELETE_FRIEND_REQUEST_REQUEST,
  PROFILE_DELETE_FRIEND_REQUEST_SUCCESS,
  PROFILE_DETAILS_FAIL,
  PROFILE_DETAILS_REQUEST,
  PROFILE_DETAILS_SUCCESS,
  PROFILE_DETAILS_UPDATE_FAIL,
  PROFILE_DETAILS_UPDATE_REQUEST,
  PROFILE_DETAILS_UPDATE_SUCCESS,
  PROFILE_FOLLOW_FAIL,
  PROFILE_FOLLOW_REQUEST,
  PROFILE_FOLLOW_SUCCESS,
  PROFILE_PICTURE_UPDATE_FAIL,
  PROFILE_PICTURE_UPDATE_REQUEST,
  PROFILE_PICTURE_UPDATE_SUCCESS,
  PROFILE_UNFOLLOW_FAIL,
  PROFILE_UNFOLLOW_REQUEST,
  PROFILE_UNFOLLOW_SUCCESS,
  PROFILE_UNFRIEND_FAIL,
  PROFILE_UNFRIEND_REQUEST,
  PROFILE_UNFRIEND_SUCCESS,
  USER_ADD_SEARCH_HISTORY_FAIL,
  USER_ADD_SEARCH_HISTORY_REQUEST,
  USER_ADD_SEARCH_HISTORY_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_FIND_FAIL,
  USER_FIND_REQUEST,
  USER_FIND_SUCCESS,
  USER_GET_FRIENDS_INFO_FAIL,
  USER_GET_FRIENDS_INFO_REQUEST,
  USER_GET_FRIENDS_INFO_SUCCESS,
  USER_GET_SEARCH_HISTORY_FAIL,
  USER_GET_SEARCH_HISTORY_REQUEST,
  USER_GET_SEARCH_HISTORY_SUCCESS,
  USER_PASSWORD_CHANGE_FAIL,
  USER_PASSWORD_CHANGE_REQUEST,
  USER_PASSWORD_CHANGE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REMOVE_SEARCH_HISTORY_FAIL,
  USER_REMOVE_SEARCH_HISTORY_REQUEST,
  USER_REMOVE_SEARCH_HISTORY_SUCCESS,
  USER_SEARCH_FAIL,
  USER_SEARCH_REQUEST,
  USER_SEARCH_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_SUGGEST_FRIENDS_FAIL,
  USER_SUGGEST_FRIENDS_REQUEST,
  USER_SUGGEST_FRIENDS_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";

export const register = (user) => {
  return async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: user });
    try {
      const { data } = await axios.post("/register", user);
      setTimeout(() => {
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
      }, 3000);
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const signIn = (user, keepSigned) => {
  return async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: user });

    try {
      const { data } = await axios.post("/signin", user);
      setTimeout(() => {
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        if (keepSigned) {
          localStorage.setItem("userInfo", JSON.stringify(data));
        }
      }, 3000);
    } catch (error) {
      dispatch({
        type: USER_SIGNIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const findUser = (email) => {
  return async (dispatch) => {
    dispatch({ type: USER_FIND_REQUEST, payload: email });
    try {
      const { data } = await axios.post(`/findUser`, { email });

      dispatch({ type: USER_FIND_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_FIND_FAIL, payload: message });
    }
  };
};

export const signOut = () => {
  return (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_SIGNOUT });
  };
};

export const changePassword = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: USER_PASSWORD_CHANGE_REQUEST, payload: email, password });
    try {
      const { data } = await axios.post(`/passwordChange`, { email, password });

      dispatch({ type: USER_PASSWORD_CHANGE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_PASSWORD_CHANGE_FAIL, payload: message });
    }
  };
};

export const detailsProfile = (username) => {
  return async (dispatch, getState) => {
    dispatch({ type: PROFILE_DETAILS_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(`/getPorfile/${username}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: PROFILE_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PROFILE_DETAILS_FAIL, payload: message });
    }
  };
};

export const updatePictureProfile = (url) => {
  return async (dispatch, getState) => {
    dispatch({ type: PROFILE_PICTURE_UPDATE_REQUEST, payload: url });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.put(
        `/updateProfilePicture`,
        { url },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      // Retrieve userInfo from localStorage
      let updatedUserInfo = JSON.parse(localStorage.getItem("userInfo"));

      // Update the picture property
      updatedUserInfo.picture = data.url;

      // Set the updated userInfo back into localStorage
      localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));

      dispatch({ type: PROFILE_PICTURE_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PROFILE_PICTURE_UPDATE_FAIL, payload: message });
    }
  };
};

export const updateCoverProfile = (url) => {
  return async (dispatch, getState) => {
    dispatch({ type: PROFILE_COVER_UPDATE_REQUEST, payload: url });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.put(
        `/updateProfilePCover`,
        { url },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      // Retrieve userInfo from localStorage
      let updatedUserInfo = JSON.parse(localStorage.getItem("userInfo"));

      // Update the picture property
      updatedUserInfo.cover = data.url;

      // Set the updated userInfo back into localStorage
      localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));

      dispatch({ type: PROFILE_COVER_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PROFILE_COVER_UPDATE_FAIL, payload: message });
    }
  };
};

export const updateDetailsProfile = ({
  bio,
  first_name,
  last_name,
  password,
  bYear,
  bMonth,
  bDay,
  address,
  country,
  relationship,
  highSchool,
  college,
  university,
  job,
  workplace,
  homeNumber,
  mobileNumber,
  instagram,
  linkedin,
}) => {
  return async (dispatch, getState) => {
    dispatch({
      type: PROFILE_DETAILS_UPDATE_REQUEST,
      payload: {
        bio,
        first_name,
        last_name,
        password,
        bYear,
        bMonth,
        bDay,
        address,
        country,
        relationship,
        highSchool,
        college,
        university,
        job,
        workplace,
        homeNumber,
        mobileNumber,
        instagram,
        linkedin,
      },
    });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.put(
        `/updateDetails`,
        {
          bio,
          first_name,
          last_name,
          password,
          bYear,
          bMonth,
          bDay,
          address,
          country,
          relationship,
          highSchool,
          college,
          university,
          job,
          workplace,
          homeNumber,
          mobileNumber,
          instagram,
          linkedin,
        },

        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: PROFILE_DETAILS_UPDATE_SUCCESS, payload: data });
      // Retrieve userInfo from localStorage
      let updatedUserInfo = JSON.parse(localStorage.getItem("userInfo"));

      // Update the picture property
      updatedUserInfo.first_name = data.first_name;
      updatedUserInfo.last_name = data.last_name;
      // Set the updated userInfo back into localStorage
      localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PROFILE_DETAILS_UPDATE_FAIL, payload: message });
    }
  };
};

export const addFriend = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: PROFILE_ADD_FRIEND_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();

    try {
      const { data } = await axios.put(
        `/addFriend/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: PROFILE_ADD_FRIEND_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PROFILE_ADD_FRIEND_FAIL, payload: message });
    }
  };
};

export const cancelRequest = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: PROFILE_CANCEL_REQUEST_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();

    try {
      const { data } = await axios.put(
        `/cancelRequest/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: PROFILE_CANCEL_REQUEST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PROFILE_CANCEL_REQUEST_FAIL, payload: message });
    }
  };
};

export const follow = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: PROFILE_FOLLOW_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();

    try {
      const { data } = await axios.put(
        `/follow/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: PROFILE_FOLLOW_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PROFILE_FOLLOW_FAIL, payload: message });
    }
  };
};

export const unfollow = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: PROFILE_UNFOLLOW_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();

    try {
      const { data } = await axios.put(
        `/unfollow/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: PROFILE_UNFOLLOW_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PROFILE_UNFOLLOW_FAIL, payload: message });
    }
  };
};

export const acceptRequest = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: PROFILE_ACCEPT_FRIEND_REQUEST_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();

    try {
      const { data } = await axios.put(
        `/acceptRequest/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: PROFILE_ACCEPT_FRIEND_REQUEST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PROFILE_ACCEPT_FRIEND_REQUEST_FAIL, payload: message });
    }
  };
};

export const unfriend = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: PROFILE_UNFRIEND_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();

    try {
      const { data } = await axios.put(
        `/unfriend/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: PROFILE_UNFRIEND_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PROFILE_UNFRIEND_FAIL, payload: message });
    }
  };
};

export const deleteRequest = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: PROFILE_DELETE_FRIEND_REQUEST_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();

    try {
      const { data } = await axios.put(
        `/deleteRequest/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: PROFILE_DELETE_FRIEND_REQUEST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PROFILE_DELETE_FRIEND_REQUEST_FAIL, payload: message });
    }
  };
};

export const searchUser = (searchTerm) => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_SEARCH_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();

    try {
      const { data } = await axios.post(
        `/search/${searchTerm}`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: USER_SEARCH_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_SEARCH_FAIL, payload: message });
    }
  };
};

export const addSearchHistoryUser = (searchUser) => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_ADD_SEARCH_HISTORY_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();

    try {
      const { data } = await axios.post(
        `/addToSearchHistory`,
        { searchUser },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: USER_ADD_SEARCH_HISTORY_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_ADD_SEARCH_HISTORY_FAIL, payload: message });
    }
  };
};
export const getSearchHistoryUser = () => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_GET_SEARCH_HISTORY_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();

    try {
      const { data } = await axios.get(
        `/getSearchHistory`,

        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: USER_GET_SEARCH_HISTORY_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_GET_SEARCH_HISTORY_FAIL, payload: message });
    }
  };
};

export const removeSearchHistoryUser = (searchUser) => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_REMOVE_SEARCH_HISTORY_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();

    try {
      const { data } = await axios.put(
        `/removeFromSearch`,
        { searchUser },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: USER_REMOVE_SEARCH_HISTORY_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_REMOVE_SEARCH_HISTORY_FAIL, payload: message });
    }
  };
};

export const getUserFriendsInfo = () => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_GET_FRIENDS_INFO_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();

    try {
      const { data } = await axios.get(
        `/getFriendsPageInfo`,

        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: USER_GET_FRIENDS_INFO_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_GET_FRIENDS_INFO_FAIL, payload: message });
    }
  };
};

export const suggestFriends = () => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_SUGGEST_FRIENDS_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();

    try {
      const { data } = await axios.get(
        `/suggestFriends`,

        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: USER_SUGGEST_FRIENDS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_SUGGEST_FRIENDS_FAIL, payload: message });
    }
  };
};

export const detailsUser = (userId) => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(
        `/getUser/${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.message && error.response?.data.message
          ? error.response.data?.message
          : error.message;
      dispatch({ type: USER_DETAILS_FAIL, payload: message });
    }
  };
};
