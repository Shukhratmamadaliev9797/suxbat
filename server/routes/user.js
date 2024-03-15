const express = require("express");
const {
  getUser,
  register,
  activateAccount,
  login,
  sendVerificationEmail,
  findUser,
  sendResetPasswordCode,
  validateResetCode,
  changePassword,
  getProfile,
  updateProfilePicture,
  updateProfileCover,
  addFriend,
  cancelRequest,
  follow,
  unfollow,
  acceptRequest,
  unfriend,
  deleteRequest,
  updateDetails,
  search,
  addToSearchHistory,
  getSearchHistory,
  removeFromSearch,
  getFriendsPageInfo,
  suggestFriends,
} = require("../controllers/user");
const { authUser } = require("../middlewares/auth");

const route = express.Router();

route.post("/register", register);
route.post("/activate", authUser, activateAccount);
route.post("/signin", login);
route.post("/sendVerification", authUser, sendVerificationEmail);
route.post("/findUser", findUser);
route.get("/getUser/:id", getUser);
route.post("/sendResetPasswordCode", sendResetPasswordCode);
route.post("/validateResetCode", validateResetCode);
route.post("/passwordChange", changePassword);
route.get("/getPorfile/:username", authUser, getProfile);
route.put("/updateProfilePicture", authUser, updateProfilePicture);
route.put("/updateProfilePCover", authUser, updateProfileCover);
route.put("/updateDetails", authUser, updateDetails);
route.put("/addFriend/:id", authUser, addFriend);
route.put("/cancelRequest/:id", authUser, cancelRequest);
route.put("/follow/:id", authUser, follow);
route.put("/unfollow/:id", authUser, unfollow);
route.put("/acceptRequest/:id", authUser, acceptRequest);
route.put("/unfriend/:id", authUser, unfriend);
route.put("/deleteRequest/:id", authUser, deleteRequest);
route.post("/search/:searchTerm", authUser, search);
route.post("/addToSearchHistory", authUser, addToSearchHistory);
route.get("/getSearchHistory", authUser, getSearchHistory);
route.put("/removeFromSearch", authUser, removeFromSearch);
route.get("/getFriendsPageInfo", authUser, getFriendsPageInfo);
route.get("/suggestFriends", authUser, suggestFriends);
module.exports = route;
