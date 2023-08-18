const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    //For email validation
    // validate: {
    //   validator: function (value) {
    //     return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    //   },
    //   message: (props) => `${props.value} is not a valid email address!`,
    // },
  },
  password: { type: String, required: true },
  designation: {
    type: String,
    enum: ["MANAGER", "TEAM_LEADER", "DEVELOPER"],
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  isVerified: {
    type: Boolean,
    required: true,
  },
});

const Employee = mongoose.model("Employee", empSchema);

module.exports = Employee;
