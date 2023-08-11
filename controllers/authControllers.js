const jwt = require("jsonwebtoken");
const { User } = require("../models/userSchema");
const { authSchema } = require("../models/joiSchema");
const bcrypt = require("bcrypt");

const handleSignUp = async (req, res) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    const isExist = await User.findOne({ email: req.body.email });
    if (!isExist) {
      const newUser = await User.create({
        ...req.body,
        password: await bcrypt.hash(req.body.password, 10),
      });
      res.status(201).send(newUser);
    } else {
      res.status(400).send("User is already Exist!");
    }
  } catch (error) {
    if (error.isJoi) res.send(error.message);
  }
};

const handleRefreshToken = () => {};

const handleLogIn = (req, res) => {
  //Create JWT
  if (req.body.email && req.body.password) {
    const accessToken = jwt.sign(
      { email: req.body.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { email: req.body.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    //check if user is exist in collection of User or not
    res.json({ accessToken, refreshToken });
  }
  res.status(400).send("Bad Request!");
};

module.exports = { handleLogIn, handleSignUp, handleRefreshToken };
