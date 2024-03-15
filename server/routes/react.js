const express = require("express");

const { authUser } = require("../middlewares/auth");
const { reactPost, getReacts } = require("../controllers/react");

const route = express.Router();

route.put("/reactPost", authUser, reactPost);
route.get("/getReacts/:id", authUser, getReacts);
module.exports = route;
