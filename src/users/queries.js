// SELECT all users
const selectUsers = "SELECT * FROM users ORDER BY user_id ASC";

// SELECT a user
const selectUserById = "SELECT * FROM users WHERE user_id = $1";

// INSER user
const insertUser =
  "INSERT INTO users (name, username, email, phone, website) VALUES ($1, $2, $3, $4, $5) RETURNING *";

// UPDATE user
const updateUserById =
  "UPDATE users SET name = COALESCE (NULLIF($1, ''), name), username = COALESCE (NULLIF($2, ''), username), email = COALESCE (NULLIF($3, ''), email), phone = COALESCE (NULLIF($4, ''), phone), website = COALESCE (NULLIF($5, ''), website) WHERE user_id = $6 RETURNING *";

// DELETE user
const deleteUserById = "DELETE FROM users WHERE user_id = $1";

module.exports = {
  selectUsers,
  selectUserById,
  insertUser,
  updateUserById,
  deleteUserById,
};
