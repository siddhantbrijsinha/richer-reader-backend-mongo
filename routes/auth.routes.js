"use strict";
const express = require("express");
const authRoute = express.Router();
const authService = require("../service/auth.service");
const {
  signupValidation,
  signinValidation,
  verifyEmailValidation,
  validate,
} = require("../utils/validation");

authRoute.post("/signup", signupValidation(), validate, authService.signUp);
authRoute.post("/signin", signinValidation(), validate, authService.signIn);
authRoute.post("/verifyEmail", verifyEmailValidation(), validate, authService.verifyEmail);

module.exports = authRoute;
