const express = require("express");
const {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../../controllers/productControllers");

const router = express.Router();

router.route("/").get(getProducts).post(addProduct);

router.route("/:id").get(getProducts).delete(deleteProduct).put(updateProduct);

module.exports = { productRoutes: router };
