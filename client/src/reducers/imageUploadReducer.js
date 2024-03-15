import {
  IMAGES_COMMENT_UPLOAD_FAIL,
  IMAGES_COMMENT_UPLOAD_REQUEST,
  IMAGES_COMMENT_UPLOAD_RESET,
  IMAGES_COMMENT_UPLOAD_SUCCESS,
  IMAGES_LIST_FAIL,
  IMAGES_LIST_REQUEST,
  IMAGES_LIST_SUCCESS,
  IMAGES_UPLOAD_FAIL,
  IMAGES_UPLOAD_REQUEST,
  IMAGES_UPLOAD_RESET,
  IMAGES_UPLOAD_SUCCESS,
} from "../constants/uploadImagesConstants";

export const imageUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case IMAGES_UPLOAD_REQUEST:
      return { loading: true };
    case IMAGES_UPLOAD_SUCCESS:
      return { loading: false, success: true, allImages: action.payload };
    case IMAGES_UPLOAD_FAIL:
      return { loading: false, error: action.payload };
    case IMAGES_UPLOAD_RESET:
      return {};
    default:
      return state;
  }
};

export const imageCommentUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case IMAGES_COMMENT_UPLOAD_REQUEST:
      return { loading: true };
    case IMAGES_COMMENT_UPLOAD_SUCCESS:
      return { loading: false, success: true, img: action.payload };
    case IMAGES_COMMENT_UPLOAD_FAIL:
      return { loading: false, error: action.payload };
    case IMAGES_COMMENT_UPLOAD_RESET:
      return {};
    default:
      return state;
  }
};

export const imagesListReducer = (state = { images: [] }, action) => {
  switch (action.type) {
    case IMAGES_LIST_REQUEST:
      return { loading: true };
    case IMAGES_LIST_SUCCESS:
      return { loading: false, photos: action.payload };
    case IMAGES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
