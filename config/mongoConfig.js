const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const app = express();

//config env
dotenv.config();

//Mongo URI
const URI = `mongodb+srv://avesh_WO:${process.env.PASS}@products.qefchk3.mongodb.net/?retryWrites=true&w=majority`;

const connectDb = () => {
  mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log(`Server is now live at ${process.env.PORT}`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { connectDb };
