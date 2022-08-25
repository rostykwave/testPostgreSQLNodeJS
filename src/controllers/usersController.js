const { getUserById, updateUserById } = require("../services/usersService");
const jwt = require("jsonwebtoken");
const { NotAuthorizedError } = require("../helpers/errors");
const app = require("../../app");

const getUserByIdController = async (req, res) => {
  const { id } = req.params;
  const user = await getUserById(id);

  res.json({ status: "success", user });
};

const updateUserByIdController = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const currentToken = authorization.split(" ")[1];
  const currentUser = jwt.decode(currentToken, process.env.JWT_SECRET);

  if (currentUser.id !== parseInt(id)) {
    throw new NotAuthorizedError(
      `Provided token is not associated with requested id: ${id}. Login with proper account`
    );
  }
  const updatedUserData = req.body;
  const updatedUser = await updateUserById(id, updatedUserData);

  req.app.io.emit("contact_update", updatedUser);

  res.json({ status: "success", updatedUser });
};

module.exports = {
  getUserByIdController,
  updateUserByIdController,
};
