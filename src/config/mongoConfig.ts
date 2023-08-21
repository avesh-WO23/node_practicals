import mongoose from "mongoose";
import dotenv from "dotenv";

//config env
dotenv.config();

//Mongo URI
const URI = `mongodb://127.0.0.1:27017`;

const connectDb = () => {
  mongoose
    .connect(URI, {
      dbName: "Company",
    })
    .then(() => {
      console.log(`Mongo Connected!`);
    })
    .catch((err) => {
      console.log(err);
    });
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoose connection is disconnected");
});

export default connectDb;
