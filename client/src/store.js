import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {
  sendPasswordResetCodeReducer,
  validateResetCodeReducer,
  verificatiomEmailLinkSendReducer,
  verifyEmailReducer,
} from "./reducers/emailReducer";
import {
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
  postGetReactsReducer,
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
  groupCreateReducer,
  groupJoinReducer,
  groupLeaveReducer,
  groupSearchReducer,
  yourGroupListReducer,
} from "./reducers/groupReducer";

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
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
