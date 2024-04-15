const express = require("express");
const { authUser } = require("../middlewares/auth");
const {
  createProduct,
  listYourProducts,
  listProducts,
  categoriesProducts,
  findProduct,
} = require("../controllers/product");

const route = express.Router();

route.post("/createProduct", authUser, createProduct);
route.get("/listYourProducts", authUser, listYourProducts);
route.get("/listProducts", authUser, listProducts);
route.get("/categoriesProducts", authUser, categoriesProducts);
route.get("/findProduct/:id", authUser, findProduct);
module.exports = route;
