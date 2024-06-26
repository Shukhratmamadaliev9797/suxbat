import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {
  sendPasswordResetCodeReducer,
  validateResetCodeReducer,
  verificatiomEmailLinkSendReducer,
  verifyEmailReducer,
} from "./reducers/emailReducer";
import {
  darkModeSwitchReducer,
  profileAcceptFriendRequestReducer,
  profileCoverUpdateReducer,
  profileDeleteFriendRequestReducer,
  profileDetailsReducer,
  profileDetailsUpdateReducer,
  profileFriendAddReducer,
  profileFriendRequestCancelReducer,
  profilePictureUpdateReducer,
  userAddSearchHistoryReducer,
  userDetailsReducer,
  userFindReducer,
  userGetFriendsInfoReducer,
  userGetSearchHistoryReducer,
  userPasswordChangeReducer,
  userRegisterReducer,
  userRemoveSearchHistoryReducer,
  userSearchReducer,
  userSignInReducer,
  userSuggestFriendsReducer,
} from "./reducers/userReducer";
import {
  postAllReducer,
  postCreateReducer,
  postDeleteReducer,
  postReactReducer,
  postSaveReducer,
  writeCommentReducer,
} from "./reducers/postReducer";
import {
  imageCommentUploadReducer,
  imageUploadReducer,
  imagesListReducer,
} from "./reducers/imageUploadReducer";
import {
  conversationCreateReducer,
  conversationListReducer,
} from "./reducers/conversationReducers";
import {
  messageCreateReducer,
  messageListReducer,
} from "./reducers/messageReducers";
import {
  groupAddPostReducer,
  groupCoverUpdateReducer,
  groupCreateReducer,
  groupFindReducer,
  groupJoinReducer,
  groupLeaveReducer,
  groupSearchReducer,
  yourGroupListReducer,
} from "./reducers/groupReducer";
import {
  ProductCategoriesListReducer,
  ProductListReducer,
  productCreateReducer,
  productFindReducer,
  yourProductListReducer,
} from "./reducers/productReducers";

const initialState = {
  userSignIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const reducer = combineReducers({
  userSignIn: userSignInReducer,
  userRegister: userRegisterReducer,
  emailVerify: verifyEmailReducer,
  verificationEmailLinkSend: verificatiomEmailLinkSendReducer,
  userFind: userFindReducer,
  userDetails: userDetailsReducer,
  userSearch: userSearchReducer,
  userAddSearchHistory: userAddSearchHistoryReducer,
  userGetSearchHistory: userGetSearchHistoryReducer,
  userRemoveSearchHistory: userRemoveSearchHistoryReducer,
  userGetFriendsInfo: userGetFriendsInfoReducer,
  resetPasswordCodeSend: sendPasswordResetCodeReducer,
  resetPasswordCodeValidate: validateResetCodeReducer,
  userPasswordChange: userPasswordChangeReducer,
  userSuggestFriends: userSuggestFriendsReducer,
  darkModeSwitch: darkModeSwitchReducer,
  postCreate: postCreateReducer,
  postAll: postAllReducer,
  postReact: postReactReducer,
  postSave: postSaveReducer,
  postDelete: postDeleteReducer,
  imageUpload: imageUploadReducer,
  imageCommentUpload: imageCommentUploadReducer,
  imagesList: imagesListReducer,
  profileDetails: profileDetailsReducer,
  profilePictureUpdate: profilePictureUpdateReducer,
  profileCoverUpdate: profileCoverUpdateReducer,
  profileDetailsUpdate: profileDetailsUpdateReducer,
  profileFriendAdd: profileFriendAddReducer,
  profileFriendRequestCancel: profileFriendRequestCancelReducer,
  profileDeleteRequest: profileDeleteFriendRequestReducer,
  profileAcceptRequest: profileAcceptFriendRequestReducer,
  writeComment: writeCommentReducer,
  conversationList: conversationListReducer,
  conversationCreate: conversationCreateReducer,
  messageList: messageListReducer,
  messageCreate: messageCreateReducer,
  groupCreate: groupCreateReducer,
  yourGroupList: yourGroupListReducer,
  groupSearch: groupSearchReducer,
  groupJoin: groupJoinReducer,
  groupLeave: groupLeaveReducer,
  groupFind: groupFindReducer,
  groupAddPost: groupAddPostReducer,
  groupCoverUpdate: groupCoverUpdateReducer,
  productCreate: productCreateReducer,
  yourProductList: yourProductListReducer,
  productList: ProductListReducer,
  productCategoriesList: ProductCategoriesListReducer,
  productFind: productFindReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
