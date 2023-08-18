import { Schema, model } from "mongoose";

const companySchema = new Schema({
  name: { type: String, required: true, unique: true },
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
  address: {
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zip: { type: Number, required: true },
  },
  contact: { type: Number, required: true, minLength: 10 },
  status: { type: String, required: true, enum: ["ACTIVE", "INACTIVE"] },
});

const Company = model("Company", companySchema);

export default Company;
