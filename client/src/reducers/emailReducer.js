import {
  EMAIL_VERIFICATION_FAIL,
  EMAIL_VERIFICATION_LINK_SENT_FAIL,
  EMAIL_VERIFICATION_LINK_SENT_REQUEST,
  EMAIL_VERIFICATION_LINK_SENT_RESET,
  EMAIL_VERIFICATION_LINK_SENT_SUCCESS,
  EMAIL_VERIFICATION_REQUEST,
  EMAIL_VERIFICATION_RESET,
  EMAIL_VERIFICATION_SUCCESS,
  PASSWORD_RESET_CODE_FAIL,
  PASSWORD_RESET_CODE_REQUEST,
  PASSWORD_RESET_CODE_SUCCESS,
  VALIDATE_RESET_CODE_FAIL,
  VALIDATE_RESET_CODE_REQUEST,
  VALIDATE_RESET_CODE_SUCCESS,
} from "../constants/emailConstants";

export const verifyEmailReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case EMAIL_VERIFICATION_REQUEST:
      return { loading: true };
    case EMAIL_VERIFICATION_SUCCESS:
      return { loading: false, success: true };
    case EMAIL_VERIFICATION_FAIL:
      return { loading: false, error: action.payload };
    case EMAIL_VERIFICATION_RESET:
      return {};
    default:
      return state;
  }
};

export const verificatiomEmailLinkSendReducer = (
  state = { success: false },
  action
) => {
  switch (action.type) {
    case EMAIL_VERIFICATION_LINK_SENT_REQUEST:
      return { loading: true };
    case EMAIL_VERIFICATION_LINK_SENT_SUCCESS:
      return { loading: false, success: true, message: action.payload.message };
    case EMAIL_VERIFICATION_LINK_SENT_FAIL:
      return { loading: false, error: action.payload };
    case EMAIL_VERIFICATION_LINK_SENT_RESET:
      return {};
    default:
      return state;
  }
};

export const sendPasswordResetCodeReducer = (
  state = { success: false },
  action
) => {
  switch (action.type) {
    case PASSWORD_RESET_CODE_REQUEST:
      return { loading: true };
    case PASSWORD_RESET_CODE_SUCCESS:
      return { loading: false, success: true, message: action.payload.message };
    case PASSWORD_RESET_CODE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const validateResetCodeReducer = (
  state = { success: false },
  action
) => {
  switch (action.type) {
    case VALIDATE_RESET_CODE_REQUEST:
      return { loading: true };
    case VALIDATE_RESET_CODE_SUCCESS:
      return { loading: false, success: true };
    case VALIDATE_RESET_CODE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
