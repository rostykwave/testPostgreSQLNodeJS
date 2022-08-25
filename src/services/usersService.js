const { pool } = require("../db/connection");
const { NotFoundError } = require("../helpers/errors");

const getUserById = async (id) => {
  const user = await pool.query(
    `SELECT first_name, last_name,email,phone FROM users where id = $1`,
    [id]
  );

  if (!user.rows[0]) {
    throw new NotFoundError(`User with id: ${id} not found`);
  }

  return user.rows[0];
};

const updateUserById = async (id, updatedUserData) => {
  const { first_name, last_name, email, phone } = updatedUserData;
  const user = await pool.query(
    `SELECT first_name, last_name, email, phone FROM users where id = $1`,
    [id]
  );

  if (!user.rows[0]) {
    throw new NotFoundError(`User with id: ${id} not found`);
  }

  const updatedUser = await pool.query(
    `UPDATE users set first_name = $1, last_name = $2, email = $3, phone = $4 where id = $5 RETURNING first_name, last_name, email, phone`,
    [first_name, last_name, email, phone, id]
  );

  return updatedUser.rows[0];
};

module.exports = {
  getUserById,
  updateUserById,
};
