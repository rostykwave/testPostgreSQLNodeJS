const {
  registration,
  getUserById,
  updateUserById,
  login,
} = require("../services/authService");

const registrationController = async (req, res) => {
  const registrationData = req.body;
  const newUser = await registration(registrationData);
  const { email } = newUser;

  res
    .status(201)
    .json({
      status: "success",
      message: `User with email ${email} successfully created. `,
    });
};

const getUserByIdController = async (req, res) => {
  const { id } = req.params;
  const user = await getUserById(id);

  res.json({ status: "success", user });
};

const updateUserByIdController = async (req, res) => {
  const { id } = req.params;
  const updatedUserData = req.body;
  const updatedUser = await updateUserById(id, updatedUserData);

  res.json({ status: "success", updatedUser });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const token = await login(email, password);

  res.json({ status: "success", token });
};

module.exports = {
  registrationController,
  getUserByIdController,
  updateUserByIdController,
  loginController,
};
