const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// userSchema.pre("save", async function (next) {
//   console.log("called before save");
//   //   next();
// });

const User = mongoose.model("User", userSchema);

module.exports = { User };
