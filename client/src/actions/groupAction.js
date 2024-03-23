import axios from "axios";
import {
  GROUP_ADD_POST_FAIL,
  GROUP_ADD_POST_REQUEST,
  GROUP_ADD_POST_SUCCESS,
  GROUP_CREATE_FAIL,
  GROUP_CREATE_REQUEST,
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

export const creatGroup = (title, description, owner) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GROUP_CREATE_REQUEST,
      payload: title,
      description,
      owner,
    });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.post(
        "/createGroup",
        {
          title,
          description,
          owner,
        },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );

      dispatch({ type: GROUP_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GROUP_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listYourGroups = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: LIST_YOUR_GROUPS_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(`/listYourGroups/${id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: LIST_YOUR_GROUPS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: LIST_YOUR_GROUPS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const searchGroup = (searchName) => {
  return async (dispatch, getState) => {
    dispatch({ type: SEARCH_GROUP_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();

    try {
      const { data } = await axios.post(
        `/searchGroup`,
        { searchName },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: SEARCH_GROUP_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: SEARCH_GROUP_FAIL, payload: message });
    }
  };
};

export const joinGroup = (groupId) => {
  return async (dispatch, getState) => {
    dispatch({ type: GROUP_JOIN_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();

    try {
      const { data } = await axios.put(
        `/joinGroup`,
        { groupId },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: GROUP_JOIN_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: GROUP_JOIN_FAIL, payload: message });
    }
  };
};

export const leaveGroup = (groupId) => {
  return async (dispatch, getState) => {
    dispatch({ type: GROUP_LEAVE_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();

    try {
      const { data } = await axios.put(
        `/leaveGroup`,
        { groupId },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: GROUP_LEAVE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: GROUP_LEAVE_FAIL, payload: message });
    }
  };
};

export const findGroup = (groupId) => {
  return async (dispatch, getState) => {
    dispatch({ type: GROUP_FIND_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();

    try {
      const { data } = await axios.get(
        `/findGroup/${groupId}`,

        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: GROUP_FIND_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: GROUP_FIND_FAIL, payload: message });
    }
  };
};

export const addPostGroup = (groupId, postId) => {
  return async (dispatch, getState) => {
    dispatch({ type: GROUP_ADD_POST_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();

    try {
      const { data } = await axios.put(
        `/addPostGroup`,
        { groupId, postId },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: GROUP_ADD_POST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: GROUP_ADD_POST_FAIL, payload: message });
    }
  };
};
