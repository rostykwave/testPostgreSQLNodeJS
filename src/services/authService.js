const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../db/connection");
const { NotAuthorizedError } = require("../helpers/errors");

const registration = async (registrationData) => {
  const { first_name, last_name, email, phone, password } = registrationData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newPerson = await pool.query(
    `INSERT INTO users(first_name, last_name, email, phone, password) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [first_name, last_name, email, phone, hashedPassword]
  );

  return newPerson.rows[0];
};

const getUserById = async (id) => {
  const user = await pool.query(`SELECT * FROM users where id = $1`, [id]);

  return user.rows[0];
};

const updateUserById = async (id, updatedUserData) => {
  const { first_name, last_name, email, phone, password } = updatedUserData;

  const updatedUser = await pool.query(
    `UPDATE users set first_name = $1, last_name = $2, email = $3, phone = $4, password = $5 where id = $6 RETURNING *`,
    [first_name, last_name, email, phone, password, id]
  );

  return updatedUser.rows[0];
};

const login = async (email, password) => {
  const user = await pool.query(`SELECT * FROM users where email = $1`, [
    email,
  ]);
  console.log("logined user", user.rows[0]);

  if (!user.rows[0]) {
    throw new NotAuthorizedError(`No user with email '${email}' found`);
  }

  if (!(await bcrypt.compare(password, user.rows[0].password))) {
    throw new NotAuthorizedError(`Wrong password`);
  }

  const token = jwt.sign(
    {
      _id: user.rows[0]._id,
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
