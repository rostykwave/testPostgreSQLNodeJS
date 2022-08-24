const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { User } = require("../db/userModel");
// const { NotAuthorizedError } = require("../helpers/errors");

const registration = async (registrationData) => {
  const { first_name, last_name, email, phone, password } = registrationData;
  //   const user = new User({ email, password });
  console.log("email", email);

  //   await user.save();
};

const login = async (email, password) => {};

module.exports = {
  registration,
  login,
};
