const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { User } = require("../db/userModel");
const { pool } = require("../db/connection");
// const { NotAuthorizedError } = require("../helpers/errors");

const registration = async (registrationData) => {
  const { first_name, last_name, email, phone, password } = registrationData;
  //   const user = new User({ email, password });
  console.log("email", email);

  const newPerson = await pool.query(
    `INSERT INTO users(id,first_name, last_name, email, phone, password) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *`,
    [8, first_name, last_name, email, phone, password]
  );

  //   await user.save();
  return newPerson.rows[0];
  // return registrationData;
};

const getUserById = async (id) => {
  const user = await pool.query(`SELECT * FROM users where id = $1`, [id]);

  return user.rows[0];
};

const updateUserById = async (id, updatedUserData) => {
  const { first_name, last_name, email, phone, password } = updatedUserData;
  console.log("email", email);

  const updatedUser = await pool.query(
    `UPDATE users set first_name = $1, last_name = $2, email = $3, phone = $4, password = $5 where id = $6 RETURNING *`,
    [first_name, last_name, email, phone, password, id]
  );

  return updatedUser.rows[0];
};

const login = async (email, password) => {};

module.exports = {
  registration,
  getUserById,
  updateUserById,
  login,
};
