-- SELECT all users
SELECT * FROM users
ORDER BY user_id ASC;

-- SELECT a user
SELECT * FROM users
WHERE user_id = $1;

-- INSERT user
INSERT INTO users (name, username, email, phone, website)
VALUES ($1, $2, $3, $4, $5) RETURNING *;

-- UPDATE user
UPDATE users 
SET name = COALESCE (NULLIF($1, ''), name), 
    username = COALESCE (NULLIF($2, ''), username), 
    email = COALESCE (NULLIF($3, ''), email), 
    phone = COALESCE (NULLIF($4, ''), phone), 
    website = COALESCE (NULLIF($5, ''), website) 
WHERE user_id = $6 RETURNING *;

-- DELETE user
DELETE FROM users
WHERE user_id = $1;
