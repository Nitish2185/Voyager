const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "VoyagerVerification", {
    expiresIn: "30d",
  });
};

module.exports = generateToken;