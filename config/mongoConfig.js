const mongoose = require("mongoose");
const dotenv = require("dotenv");

//config env
dotenv.config();

//Mongo URI
const URI = `mongodb+srv://avesh_WO:${process.env.PASS}@products.qefchk3.mongodb.net/?retryWrites=true&w=majority`;

const connectDb = () => {
  mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log(`Mongo Connected!`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { connectDb };
