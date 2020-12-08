// load env variable
require("dotenv").config();

const {
  PORT,
  JWT_KEY,
  JWT_ALGORITHM,
  NODE_ENV,
  MONGODB_URI
} = process.env;

module.exports = {
  PORT,
  JWT_KEY,
  JWT_ALGORITHM,
  NODE_ENV,
  MONGODB_URI
};
