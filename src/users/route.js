const express = require("express");
const usersRouter = express.Router();

// Callback imports
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("./controller");

// Validation
const { validateUserPost, validateUserPut } = require("../../utils/validator");

// GET all users
usersRouter.get("/", getUsers);

// GET one user
usersRouter.get("/:id", getUser);

// POST user
usersRouter.post("/", validateUserPost, createUser);

// UPDATE user
usersRouter.put("/:id", validateUserPut, updateUser);

// DELETE user
usersRouter.delete("/:id", deleteUser);

module.exports = usersRouter;
