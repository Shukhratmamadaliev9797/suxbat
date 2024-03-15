const express = require("express");

const { authUser } = require("../middlewares/auth");
const {
  createPost,
  getAllPost,
  comment,
  savePost,
  deletePost,
} = require("../controllers/post");

const route = express.Router();

route.post("/createPost", authUser, createPost);
route.get("/getAllPost", authUser, getAllPost);
route.put("/comment", authUser, comment);
route.put("/savePost/:id", authUser, savePost);
route.delete("/deletePost/:id", authUser, deletePost);

module.exports = route;
