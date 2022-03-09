const db = require("../../db/index");

// Query imports
const {
  selectUsers,
  selectUserById,
  insertUser,
  updateUserById,
  deleteUserById,
} = require("./queries");

// Error handler helper functions
const {
  uniqueConstraintError,
  validateIdError,
  serverError,
} = require("../../utils/errorHandlers");

// GET all users
const getUsers = async (req, res, next) => {
  try {
    const all = await db.query(selectUsers);
    res.status(200).json(all.rows);
  } catch (err) {
    serverError(err, next);
  }
};

// GET one user
const getUser = async (req, res, next) => {
  const id = parseInt(req.params.id);

  try {
    // Check if user with the specified ID exists
    const getUserById = await db.query(selectUserById, [id]);
    // Throw error if it doesn't
    if (!getUserById.rows.length) {
      validateIdError(id, next);
    } else {
      // Proceed with the operation
      res.status(200).json(getUserById.rows[0]);
    }
  } catch (err) {
    serverError(err, next);
  }
};

// CREATE user
const createUser = async (req, res, next) => {
  const { name, username, email, phone, website } = req.body;

  try {
    const create = await db.query(insertUser, [
      name,
      username,
      email,
      phone,
      website,
    ]);
    res
      .status(201)
      .json({ message: "User Created Successfully!", user: create.rows[0] });
  } catch (err) {
    // If UNIQUE constraint is violated
    if (err.code == "23505") {
      uniqueConstraintError(err, next);
    } else {
      serverError(err, next);
    }
  }
};

// UPDATE user
const updateUser = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const { name, username, email, phone, website } = req.body;

  try {
    // Check if user with the specified ID exists
    const check = await db.query(selectUserById, [id]);
    // Throw error if it doesn't
    if (!check.rows.length) {
      validateIdError(id, next);
    } else {
      // Proceed with the operation
      const update = await db.query(updateUserById, [
        name,
        username,
        email,
        phone,
        website,
        id,
      ]);
      res
        .status(200)
        .json({ message: "User Updated Successfully!", user: update.rows[0] });
    }
  } catch (err) {
    // If UNIQUE constraint is violated
    if (err.code == "23505") {
      uniqueConstraintError(err, next);
    } else {
      serverError(err, next);
    }
  }
};

// DELETE user
const deleteUser = async (req, res, next) => {
  const id = parseInt(req.params.id);

  try {
    // Check if user with the specified ID exists
    const check = await db.query(selectUserById, [id]);
    // Throw error if it doesn't
    if (!check.rows.length) {
      validateIdError(id, next);
    } else {
      // Proceed with the operation
      await db.query(deleteUserById, [id]);
      res.status(204).json();
    }
  } catch (err) {
    serverError(err, next);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
