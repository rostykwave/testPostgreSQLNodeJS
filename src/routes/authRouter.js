const express = require("express");
const router = new express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");
const { asyncWrapper } = require("../helpers/apiHelpers");
const {
  registrationController,
  getUserByIdController,
  updateUserByIdController,
  loginController,
} = require("../controllers/authController");

router.use(authMiddleware);

router.post("/users", asyncWrapper(registrationController));
router.get("/users/:id", asyncWrapper(getUserByIdController));
router.put("/users/:id", asyncWrapper(updateUserByIdController));
router.post("/login", asyncWrapper(loginController));

module.exports = { authRouter: router };
