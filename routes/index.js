"use strict";
const sendResponse = require("../utils/sendResponse");
const authRoutes = require("./auth.routes");

module.exports = (app) => {
  app.use("/api/check", (req, res) => {
    sendResponse(res, 200, "working fine");
  });
  app.use("/api/auth", authRoutes);
};
