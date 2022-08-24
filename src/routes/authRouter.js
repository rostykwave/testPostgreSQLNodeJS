const express = require("express");
const router = new express.Router();

const { asyncWrapper } = require("../helpers/apiHelpers");
const {
  registrationController,
  // loginController,
} = require("../controllers/authController");

router.post("/users", asyncWrapper(registrationController));
// router.post("/users/:id", asyncWrapper(registrationController));
// router.post("/login", asyncWrapper(loginController));

module.exports = { authRouter: router };
