const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  maritalStatus: Boolean,
  hobbies: [String],
  birthYear: Number,
});

const Person = mongoose.model("Person", personSchema);
module.exports = { Person };
