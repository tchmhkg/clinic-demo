const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

verifyToken = (req, res, next) => {
  let authorizationHeader = req.get("Authorization");
  let token = authorizationHeader ? authorizationHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(403).send({
      success: false,
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized or token expired! Please login again.",
      });
    }
    req.userId = decoded.id;
    next();
    return;
  });
};

const authJwt = {
  verifyToken,
};
module.exports = authJwt;
