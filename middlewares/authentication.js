const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const authHeaders = req.headers["authorization"];
  if (!authHeaders) return res.sendStatus(401);
  const token = authHeaders.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err) {
      const message =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
      return res.send(message);
    }
    next();
  });
};

module.exports = authentication;
