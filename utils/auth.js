const jwt = require("jsonwebtoken");

const { JWT_KEY, JWT_ALGORITHM } = require('../configs')
const sendResponse = require("./sendResponse");

const privateKey = JWT_KEY;
const expiresIn = 60 * 60 * 24;

const jwtConfig = {
  algorithm: JWT_ALGORITHM,
  expiresIn
};

// GENERATE TOKEN
const generateToken = (data) => jwt.sign(data, privateKey, jwtConfig);

// VERIFY TOKEN
const verifyToken = (req, res, next) => {
  const { headers } = req;

  try {
    const token = headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) throw new Error("Authentication failed!");
    const decodedToken = jwt.verify(token, privateKey);

    if (["JsonWebTokenError", "TokenExpiredError"].includes(decodedToken.name)) throw new Error(decodedToken.name);
    req.body.userData = decodedToken;
    return next();
  } catch (err) {
    return sendResponse(res, 401, {}, "Access denied, Please login");
  }
};

const getTokenDetails = (token) => {
  const decodedToken = jwt.verify(token, privateKey);
  if (["JsonWebTokenError", "TokenExpiredError"].includes(decodedToken.name)) throw new Error(decodedToken.name);
  return decodedToken;
};

module.exports = {
  generateToken,
  verifyToken,
  getTokenDetails
};
