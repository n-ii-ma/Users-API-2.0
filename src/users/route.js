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

// GET all users
usersRouter.get("/", getUsers);

// GET one user
usersRouter.get("/:id", getUser);

// POST user
usersRouter.post("/", createUser);

// UPDATE user
usersRouter.put("/:id", updateUser);

// DELETE user
usersRouter.delete("/:id", deleteUser);

module.exports = usersRouter;
