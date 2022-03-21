CREATE TABLE IF NOT EXISTS articles
(
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    text  TEXT
);

CREATE TABLE IF NOT EXISTS users
(
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    role TEXT,
    password TEXT
)