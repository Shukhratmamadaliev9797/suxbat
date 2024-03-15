const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Import controllers and middlewares
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
} = require("./controllers/user");

const { authUser } = require("./middlewares/auth");
const mediaUpload = require("./middlewares/imageUpload"); // Rename to mediaUpload
const { uploadMedia, listImages } = require("./controllers/upload");

const { reactPost, getReacts } = require("./controllers/react");

const {
  createPost,
  getAllPost,
  comment,
  savePost,
  deletePost,
} = require("./controllers/post");

const { createMessages, listMessages } = require("./controllers/message");
const {
  createConversations,
  listConversations,
} = require("./controllers/conversation");

// Env config
dotenv.config();

// Initialize express
const app = express();

// Convert data to JSON
app.use(express.json());

// Access control allow origin
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// File upload
app.use(fileUpload({ useTempFiles: true }));

// Database connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => console.log(err));

// Routes

// User routes
app.post("/register", register);
app.post("/activate", authUser, activateAccount);
app.post("/signin", login);
app.post("/sendVerification", authUser, sendVerificationEmail);
app.post("/findUser", findUser);
app.get("/getUser/:id", getUser);
app.post("/sendResetPasswordCode", sendResetPasswordCode);
app.post("/validateResetCode", validateResetCode);
app.post("/passwordChange", changePassword);
app.get("/getPorfile/:username", authUser, getProfile);
app.put("/updateProfilePicture", authUser, updateProfilePicture);
app.put("/updateProfilePCover", authUser, updateProfileCover);
app.put("/updateDetails", authUser, updateDetails);
app.put("/addFriend/:id", authUser, addFriend);
app.put("/cancelRequest/:id", authUser, cancelRequest);
app.put("/follow/:id", authUser, follow);
app.put("/unfollow/:id", authUser, unfollow);
app.put("/acceptRequest/:id", authUser, acceptRequest);
app.put("/unfriend/:id", authUser, unfriend);
app.put("/deleteRequest/:id", authUser, deleteRequest);
app.post("/search/:searchTerm", authUser, search);
app.post("/addToSearchHistory", authUser, addToSearchHistory);
app.get("/getSearchHistory", authUser, getSearchHistory);
app.put("/removeFromSearch", authUser, removeFromSearch);
app.get("/getFriendsPageInfo", authUser, getFriendsPageInfo);
app.get("/suggestFriends", authUser, suggestFriends);

// Upload routes
app.post("/uploadMedia", authUser, mediaUpload, uploadMedia);
app.post("/listImages", authUser, listImages);

// React routes
app.put("/reactPost", authUser, reactPost);
app.get("/getReacts/:id", authUser, getReacts);

// Post routes
app.post("/createPost", authUser, createPost);
app.get("/getAllPost", authUser, getAllPost);
app.put("/comment", authUser, comment);
app.put("/savePost/:id", authUser, savePost);
app.delete("/deletePost/:id", authUser, deletePost);

// Message routes
app.post("/createMessages", createMessages);
app.get("/listMessages/:id", listMessages);

// Conversation routes
app.post("/createConversations", createConversations);
app.get("/listConversations/:id", listConversations);

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
// Port setup
const port = process.env.PORT || 5000;

// Start server
app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
