import mongoose from "mongoose";
import dotenv from "dotenv";

//config env
dotenv.config();

//Mongo URI
const URI = `mongodb+srv://avesh_WO:${process.env.PASS}@products.qefchk3.mongodb.net/?retryWrites=true&w=majority`;

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
