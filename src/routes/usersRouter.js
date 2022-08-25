const express = require("express");
const router = new express.Router();

const { updateUserValidation } = require("../middlewares/validationMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { asyncWrapper } = require("../helpers/apiHelpers");
const {
  getUserByIdController,
  updateUserByIdController,
} = require("../controllers/usersController");

router.use(authMiddleware);

router.get("/users/:id", asyncWrapper(getUserByIdController));
router.put(
  "/users/:id",
  updateUserValidation,
  asyncWrapper(updateUserByIdController)
);

module.exports = { usersRouter: router };
