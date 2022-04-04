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
} = require("../../utils/errorHandlers");

// Hide helper function for hiding undefined and null values
const hideNull = require("../../utils/helper");

// GET all users
const getUsers = async (req, res, next) => {
  try {
    const all = await db.query(selectUsers);
    res.status(200).json(hideNull(all.rows));
  } catch (err) {
    next(err);
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
      res.status(200).json(hideNull(getUserById.rows[0]));
    }
  } catch (err) {
    next(err);
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
    res.status(201).json({
      message: "User Created Successfully!",
      user: hideNull(create.rows[0]),
    });
  } catch (err) {
    // If UNIQUE constraint is violated
    if (err.code == "23505") {
      uniqueConstraintError(next);
    } else {
      next(err);
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
      res.status(200).json({
        message: "User Updated Successfully!",
        user: hideNull(update.rows[0]),
      });
    }
  } catch (err) {
    // If UNIQUE constraint is violated
    if (err.code == "23505") {
      uniqueConstraintError(next);
    } else {
      next(err);
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
    next(err);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
