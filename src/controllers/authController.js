const { registration, login } = require("../services/authService");

const registrationController = async (req, res) => {
  const registrationData = req.body;
  console.log("registrationData", registrationData);

  await registration(registrationData);

  res.json({ status: "success" });
};

const loginController = async (req, res) => {};

module.exports = { registrationController, loginController };
