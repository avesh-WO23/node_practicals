const jwt = require("jsonwebtoken");
const { User } = require("../models/userSchema");
const { authSchema } = require("../models/joiSchema");
const bcrypt = require("bcrypt");
const client = require("../config/redisConfig");
const createError = require("http-errors");

//Redis connection
client.connect();

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

//Login
const handleLogIn = async (req, res, next) => {
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
          { expiresIn: "1y" }
        );
        //Now refresh token stored in redis
        await client.set(
          existingUser.id,
          refreshToken,
          { EX: 365 * 24 * 60 * 60 },
          (err, replay) => {
            if (err) return res.send(err.message);
          }
        );

        //Store refresh token in the cookie
        // res.cookie("jwt", refreshToken, {
        //   httpOnly: true,
        //   maxAge: 24 * 60 * 60 * 1000,
        // });
        return res.json({ message: "Logged In", accessToken, refreshToken });
      }
      return res.status(404).send("Password don't match!");
    }
  } catch (error) {
    return res.send(error.message);
  }
};

//Refresh token
const handleRefreshToken = async (req, res) => {
  //Get refresh token from the cookie
  // const cookies = req.cookies;
  // if (!cookies?.jwt) return res.sendStatus(401);
  // const refreshToken = cookies.jwt;

  //Get token from the redis db
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const secretKey = process.env.REFRESH_TOKEN_SECRET;
  try {
    //verify old jwt refresh token
    jwt.verify(refreshToken, secretKey, async (err, decode) => {
      if (err) return res.sendStatus(403);

      //Generate new access and refresh token
      const existUser = await User.findOne({ email: decode.email });
      if (!existUser) return res.status(404).send("User Not found!");
      const accessToken = jwt.sign(
        { email: decode.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );
      const refreshToken = jwt.sign({ email: decode.email }, secretKey, {
        expiresIn: "1d",
      });

      await client.set(
        existUser.id,
        refreshToken,
        { EX: 365 * 24 * 60 * 60 },
        (err, val) => {
          if (err) return res.send(err.message);
        }
      );
      return res.status(201).json({ accessToken, refreshToken });
    });
  } catch (error) {
    return res.send(error.message);
  }
};

//handle Logout
const handleLogOut = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const secretKey = process.env.REFRESH_TOKEN_SECRET;
  try {
    //verify old jwt refresh token
    jwt.verify(refreshToken, secretKey, async (err, decode) => {
      if (err) return res.sendStatus(403);

      //Generate new access and refresh token
      const existUser = await User.findOne({ email: decode.email });
      if (!existUser) return res.status(404).send("User Not found!");
      await client.del(existUser.id, (err, val) => {
        if (err) return res.send(err.message);
      });
      return res.status(200).send("Logged Out!");
    });
  } catch (error) {
    return res.send(error.message);
  }
};

module.exports = {
  handleLogIn,
  handleSignUp,
  handleRefreshToken,
  handleLogOut,
};
