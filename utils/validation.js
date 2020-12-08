const { body, validationResult } = require("express-validator");
const sendResponse = require("../utils/sendResponse");

// @Song api validaion
const createSongValidation = () => {
  return [
    body("title", "Invalid title.").isString().isLength({ min: 3, max: 30 }),
    body("singer", "Invalid singer.").isString().isLength({ min: 3, max: 30 }),
    body("albumId", "Invalid albumId.").isString().isLength({ min: 3 }),
    body("playTime", "Invalid playTime.").isNumeric(),
  ];
};

// @Playlist api validaion
const createPlaylistValidation = () => {
  return [
    body("name", "Invalid name.").isString().isLength({ min: 2, max: 30 }),
    body("songsIdArray", "Invalid songs data.").isArray(),
  ];
};

const updatePlaylistValidation = () => {
  return [
    body("playListId", "Invalid playListId.").isString().isLength({ min: 3 }),
    body("songsArray", "Invalid songs data.").isArray(),
  ];
};

// @Album api validaion
const createAlbumValidation = () => {
  return [
    body("title", "Invalid title.").isString().isLength({ min: 3, max: 30 }),
  ];
};

// @Auth api validaion
const signupValidation = () => {
  return [
    body("firstName", "firstName  cannot be empty.")
      .isString()
      .isLength({ min: 1 }),
    body("lastName", "lastName  cannot be empty.")
      .isString()
      .isLength({ min: 1 }),
    body("email", "Invalid Email.").isEmail(),
    body("password", "Password  should be more than 5 charcters.")
      .isString()
      .isLength({ min: 5 }),
  ];
};

const signinValidation = () => {
  return [
    body("email", "Invalid Email.").isEmail(),
    body("password", "Password  should be more than 5 charcters.")
      .isString()
      .isLength({ min: 5 }),
  ];
};

const verifyEmailValidation = () => {
  return [
    body("email", "Invalid Email.").isEmail(),
    body("otp", "Otp  should be  6 charcters.")
      .isString()
      .isLength({ min: 6,max:6 }),
  ];
};

// @ Validate function
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return sendResponse(
    res,
    422,
    { errors: extractedErrors },
    "Invalid Param data"
  );
};

module.exports = {
  signupValidation,
  signinValidation,
  verifyEmailValidation,
  validate,
};
