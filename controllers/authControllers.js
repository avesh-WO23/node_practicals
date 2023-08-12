const jwt = require("jsonwebtoken");
const { User } = require("../models/userSchema");
const { authSchema } = require("../models/joiSchema");
const bcrypt = require("bcrypt");

//Sign up
const handleSignUp = async (req, res) => {
  try {
    await authSchema.validateAsync(req.body);
    const isExist = await User.findOne({ email: req.body.email });
    if (!isExist) {
      const newUser = await User.create({
        ...req.body,
        password: await bcrypt.hash(req.body.password, 10),
      });
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
      return res.status(201).json({ newUser, accessToken, refreshToken });
    } else {
      return res.status(400).send("User is already Exist!");
    }
  } catch (error) {
    return res.send(error.message);
  }
};

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  console.log("cookies", cookies);
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const secretKey = process.env.REFRESH_TOKEN_SECRET;
  try {
    //verify old jwt refresh token
    jwt.verify(refreshToken, secretKey, (err, decode) => {
      if (err) return res.sendStatus(403);
      //Generate new access and refresh token
      const accessToken = jwt.sign(
        { email: decode.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );
      const refreshToken = jwt.sign({ email: decode.email }, secretKey, {
        expiresIn: "1d",
      });
      return res.status(201).json({ accessToken, refreshToken });
    });
  } catch (error) {
    return res.send(error.message);
  }
};

//Login
const handleLogIn = async (req, res) => {
  try {
    await authSchema.validateAsync(req.body);
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        existingUser.password
      );
      if (isPasswordCorrect) {
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
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        return res.json({ message: "Logged In", accessToken, refreshToken });
      }
      return res.status(404).send("Password don't match!");
    }
  } catch (error) {
    return res.send(error.message);
  }
};

const handleLogOut = (req, res) => {};

module.exports = {
  handleLogIn,
  handleSignUp,
  handleRefreshToken,
  handleLogOut,
};
