const express = require("express");
const {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../../controllers/productControllers");

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(addProduct)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = { productRoutes: router };
