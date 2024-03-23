const express = require("express");
const { authUser } = require("../middlewares/auth");
const {
  createGroup,
  listYourGroups,
  searchGroup,
  joinGroup,
  leaveGroup,
  findGroup,
  addPostGroup,
} = require("../controllers/groups");

const route = express.Router();

route.post("/createGroup", authUser, createGroup);
route.get("/listYourGroups/:id", authUser, listYourGroups);
route.post("/searchGroup", authUser, searchGroup);
route.put("/joinGroup", authUser, joinGroup);
route.put("/leaveGroup", authUser, leaveGroup);
route.get("/findGroup/:id", authUser, findGroup);
route.put("/addPostGroup", authUser, addPostGroup);
module.exports = route;
