const express = require("express");
const { authUser } = require("../middlewares/auth");
const mediaUpload = require("../middlewares/imageUpload"); // Rename to mediaUpload
const { uploadMedia, listImages } = require("../controllers/upload");

const route = express.Router();

route.post("/uploadMedia", authUser, mediaUpload, uploadMedia);
route.post("/listImages", authUser, listImages);
module.exports = route;
