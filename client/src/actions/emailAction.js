import axios from "axios";
import {
  EMAIL_VERIFICATION_FAIL,
  EMAIL_VERIFICATION_LINK_SENT_FAIL,
  EMAIL_VERIFICATION_LINK_SENT_REQUEST,
  EMAIL_VERIFICATION_LINK_SENT_SUCCESS,
  EMAIL_VERIFICATION_REQUEST,
  EMAIL_VERIFICATION_SUCCESS,
  PASSWORD_RESET_CODE_FAIL,
  PASSWORD_RESET_CODE_REQUEST,
  PASSWORD_RESET_CODE_SUCCESS,
  VALIDATE_RESET_CODE_FAIL,
  VALIDATE_RESET_CODE_REQUEST,
  VALIDATE_RESET_CODE_SUCCESS,
} from "../constants/emailConstants";

export const verifyEmail = (token) => {
  return async (dispatch, getState) => {
    dispatch({ type: EMAIL_VERIFICATION_REQUEST, payload: token });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.post(
        "/activate",
        { token },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      setTimeout(() => {
        dispatch({ type: EMAIL_VERIFICATION_SUCCESS, payload: data });
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ ...userInfo, verified: true })
        );
      }, 2000);
    } catch (error) {
      dispatch({
        type: EMAIL_VERIFICATION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const sendVerificationLink = () => {
  return async (dispatch, getState) => {
    dispatch({ type: EMAIL_VERIFICATION_LINK_SENT_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.post(
        "/sendVerification",
        {},
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: EMAIL_VERIFICATION_LINK_SENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EMAIL_VERIFICATION_LINK_SENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const sendPasswordResetCode = (email) => {
  return async (dispatch) => {
    dispatch({ type: PASSWORD_RESET_CODE_REQUEST, payload: email });
    try {
      const { data } = await axios.post("/sendResetPasswordCode", { email });
      dispatch({ type: PASSWORD_RESET_CODE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PASSWORD_RESET_CODE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const validateResetCode = (email, code) => {
  return async (dispatch) => {
    dispatch({ type: VALIDATE_RESET_CODE_REQUEST, payload: email, code });
    try {
      const { data } = await axios.post("/validateResetCode", { email, code });
      dispatch({ type: VALIDATE_RESET_CODE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: VALIDATE_RESET_CODE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
