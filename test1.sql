CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(16) NOT NULL,
    last_name VARCHAR(16) NOT NULL,
    email VARCHAR(35) NOT NULL,
    facebook VARCHAR(32),
    instagram VARCHAR(255),
    linkedin VARCHAR(255),
    class VARCHAR(8) NOT NULL,
    interests TEXT,
    registered_on DATETIME NOT NULL,
    profile_image BLOB,
    password TEXT NOT NULL,
    phone_number VARCHAR(15),
    bio TEXT,
    cv BLOB
);

CREATE TABLE club (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    ownerId INT NOT NULL,
    name TEXT NOT NULL,
    bio TEXT,
    created_at DATETIME NOT NULL,
    profile_photo BLOB,
    cover_photo BLOB,
    approved BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (ownerId) REFERENCES users(id)
);

CREATE TABLE interests (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE user_interests (
    userId INT NOT NULL,
    interestsId INT NOT NULL,
    PRIMARY KEY (userId, interestsId),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (interestsId) REFERENCES interests(id)
);

CREATE TABLE clubMembers (
    clubId INT NOT NULL,
    userId INT NOT NULL,
    admin BOOLEAN,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (clubId, userId),
    FOREIGN KEY (clubId) REFERENCES club(id),
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE event (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    clubId INT NOT NULL,
    title TEXT,
    description1 TEXT,
    photos BLOB, 
    date1 date,
    FOREIGN KEY (clubId) REFERENCES club(id)
);

CREATE TABLE posts (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    clubId INT NOT NULL,
    text TEXT NOT NULL,
    photos BLOB,
    FOREIGN KEY (clubId) REFERENCES club(id)
);
