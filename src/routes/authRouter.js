const express = require("express");
const router = new express.Router();

const { addUserValidation } = require("../middlewares/validationMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { asyncWrapper } = require("../helpers/apiHelpers");
const {
  registrationController,
  getUserByIdController,
  updateUserByIdController,
  loginController,
} = require("../controllers/authController");

router.post("/users", addUserValidation, asyncWrapper(registrationController));
router.post("/login", asyncWrapper(loginController));

router.use(authMiddleware);

router.get("/users/:id", asyncWrapper(getUserByIdController));
router.put("/users/:id", asyncWrapper(updateUserByIdController));

module.exports = { authRouter: router };
