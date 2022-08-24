const {
  registration,
  getUserById,
  updateUserById,
  login,
} = require("../services/authService");

const registrationController = async (req, res) => {
  const registrationData = req.body;
  // console.log("registrationData", registrationData);

  // await registration(registrationData);
  const newUser = await registration(registrationData);

  res.json({ status: "success", newUser });
};

const getUserByIdController = async (req, res) => {
  const { id } = req.params;

  console.log("id", id);

  const User = await getUserById(id);

  res.json({ status: "success", User });
};

const updateUserByIdController = async (req, res) => {
  const { id } = req.params;
  const updatedUserData = req.body;
  console.log("id", id);
  const updatedUser = await updateUserById(id, updatedUserData);
  res.json({ status: "success", updatedUser });
};

const loginController = async (req, res) => {};

module.exports = {
  registrationController,
  getUserByIdController,
  updateUserByIdController,
  loginController,
};
