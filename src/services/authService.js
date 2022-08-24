const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { User } = require("../db/userModel");
const { pool } = require("../db/connection");
// const { NotAuthorizedError } = require("../helpers/errors");

const registration = async (registrationData) => {
  const { first_name, last_name, email, phone, password } = registrationData;
  //   const user = new User({ email, password });
  console.log("email", email);
  console.log("pool", pool);

  //   await user.save();
};

const login = async (email, password) => {};

module.exports = {
  registration,
  login,
};
