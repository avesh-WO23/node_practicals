const {
  getBooks,
  updateBook,
  addBook,
  deleteBook,
} = require("../../controllers/libControllers");

const express = require("express");

const router = express.Router();

router
  .route("/")
  .get(getBooks)
  .post(addBook)
  .put(updateBook)
  .delete(deleteBook);

module.exports = { libraryRoutes: router };
