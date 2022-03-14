-- Create table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    website VARCHAR(255)
);

-- Populate data
INSERT INTO users (name, username, email, phone, website)
VALUES 
    ('Leanne Graham', 'Breting', 'sincere@april.biz', '1770736803', 'hildegard.org'),
    ('Ervin Howell', 'Antonette', 'shanna@melissa.tv', '1069265935', 'anastasia.net'),
    ('Clementine Bauch', 'Samantha', 'nathan@yesenia.net', '1463123444', 'ramiro.info'),
    ('Patricia Lebsack', 'Karianne', 'julianne_oconner@kory.org', '4931709623', 'kale.biz'),
    ('Chelsey Dietrich', 'Kamren', 'lucio_hettinger@annie.ca', '2549541289', 'demarco.info'),
    ('Mrs. Dennis Schulist', 'LeopoldoCorkery', 'karley_dach@jasper.info', '1477935847', 'ola.org'),
    ('Kurtis Weissnat', 'ElwynSkiles', 'telly_hoeger@billy.biz', '2100676132', 'elvis.io'),
    ('Nicholas Runolfsdottir V', 'MaximeNienow', 'sherwood@rosamond.me', '5864936943', 'jacynthe.com'),
    ('Glenna Reichert', 'Delphine', 'chaim_mcdermott@dana.io', '7759766794', 'conrad.com'),
    ('Clementina DuBuque', 'MoriahStanton', 'rey_padberg@karina.biz', '2464838046', 'ambrose.net');

-- SELECT all users
SELECT * FROM users
ORDER BY user_id;

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
