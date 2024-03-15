const express = require("express");
const { authUser } = require("../middlewares/auth");
const {
  createConversations,
  listConversations,
} = require("../controllers/conversation");

const route = express.Router();

route.post("/createConversations", createConversations);
route.get("/listConversations/:id", listConversations);

module.exports = route;
