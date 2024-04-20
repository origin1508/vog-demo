const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY || "jwt-secret-key";

module.exports = {
  sign: (payload) => {
    return jwt.sign(payload, secret);
  },
};
