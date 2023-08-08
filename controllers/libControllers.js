const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const emp = path.join(__dirname, "../models/lib.json");

const getBooks = (req, res) => {};
const addBook = (req, res) => {};
const updateBook = (req, res) => {};
const deleteBook = (req, res) => {};

module.exports = { getBooks, addBook, updateBook, deleteBook };
