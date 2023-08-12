const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const authHeaders = req.headers["authorization"];
  if (!authHeaders) res.sendStatus(401);
  const token = authHeaders.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ message: err.message });
    }
    next();
  });
};

module.exports = authentication;
