// SELECT all users
const selectUsers = "SELECT * FROM users";

// SELECT a user
const selectUserById = "SELECT * FROM users WHERE user_id = $1";

// INSER user
const insertUser =
  "INSERT INTO users (name, username, email, phone, website) VALUES ($1, $2, $3, $4, $5) RETURNING *";

// UPDATE user
const updateUserById =
  "UPDATE users SET name = $1, username = $2, email = $3, phone = $4, website = $5 WHERE user_id = $6 RETURNING *";

// DELETE user
const deleteUserById = "DELETE FROM users WHERE user_id = $1";

module.exports = {
  selectUsers,
  selectUserById,
  insertUser,
  updateUserById,
  deleteUserById,
};
