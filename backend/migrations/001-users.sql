create table users
(
    id integer not null
        constraint users_pk
            primary key autoincrement,
    username TEXT    not null,
    password TEXT    not null,
    role     TEXT    not null
);

create unique index users_username_uindex
    on users (username);