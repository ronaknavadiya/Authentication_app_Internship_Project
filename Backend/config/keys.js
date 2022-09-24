require("dotenv").config();

module.exports = {
  secretOrKey: "secret",
  mongoURI: process.env.mongoURI,
};
