const { registration, login } = require("../services/authService");

const registrationController = async (req, res) => {
  const registrationData = req.body;
  const newUser = await registration(registrationData);
  const { email, id } = newUser;

  res.status(201).json({
    status: "success",
    message: `User with email ${email} successfully created. Id ${id}`,
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const token = await login(email, password);

  res.json({ status: "success", token });
};

module.exports = {
  registrationController,
  loginController,
};
