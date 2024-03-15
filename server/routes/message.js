const express = require("express");
const { createMessages, listMessages } = require("../controllers/message");
const { authUser } = require("../middlewares/auth");

const route = express.Router();

route.post("/createMessages", createMessages);
route.get("/listMessages/:id", listMessages);

module.exports = route;
