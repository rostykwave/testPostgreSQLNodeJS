const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../db/connection");
const {
  NotAuthorizedError,
  AlreadyRegisteredError,
  NotFoundError,
} = require("../helpers/errors");

const registration = async (registrationData) => {
  const { first_name, last_name, email, phone, password } = registrationData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const normalizedEmail = email.toLowerCase().trim();
  //Find wether this user exists
  const user = await pool.query(`SELECT * FROM users where email = $1`, [
    normalizedEmail,
  ]);
  //IF yes - 409 and exit
  if (user.rows[0]) {
    throw new AlreadyRegisteredError(
      `User with email: ${normalizedEmail} already exists`
    );
  }
  //Save new user to DB
  const newUser = await pool.query(
    `INSERT INTO users(first_name, last_name, email, phone, password) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [first_name, last_name, normalizedEmail, phone, hashedPassword]
  );

  return newUser.rows[0];
};

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

const login = async (email, password) => {
  const normalizedEmail = email.toLowerCase().trim();

  const user = await pool.query(`SELECT * FROM users where email = $1`, [
    normalizedEmail,
  ]);

  if (!user.rows[0]) {
    throw new NotAuthorizedError(
      `No user with email '${normalizedEmail}' found`
    );
  }

  if (!(await bcrypt.compare(password, user.rows[0].password))) {
    throw new NotAuthorizedError(`Wrong password`);
  }

  const token = jwt.sign(
    {
      id: user.rows[0].id,
      createdAt: user.rows[0].createdAt,
    },
    process.env.JWT_SECRET
  );

  return token;
};

module.exports = {
  registration,
  getUserById,
  updateUserById,
  login,
};
