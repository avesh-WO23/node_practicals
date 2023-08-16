const jwt = require("jsonwebtoken");

const signAccessToken = (user) => {
  return new Promise((res, rej) => {
    const payload = {
      email: user.email,
    };
    const options = {
      expiresIn: "30s",
      audience: user.id,
    };
    const secretKey = process.env.ACCESS_TOKEN_SECRET;
    jwt.sign(payload, secretKey, options, (err, decoded) => {
      if (err) rej(err);
      res(decoded);
    });
  });
};

const signRefreshToken = (user) => {
  return new Promise((res, rej) => {
    const payload = {
      email: user.email,
    };
    const options = {
      expiresIn: "1y",
      audience: user.id,
    };
    const secretKey = process.env.REFRESH_TOKEN_SECRET;
    jwt.sign(payload, secretKey, options, (err, decoded) => {
      if (err) {
        rej(err);
      }
      res(decoded);
    });
  });
};

module.exports = { signAccessToken, signRefreshToken };
