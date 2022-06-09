create table flights
(
    id integer not null
        constraint flights_pk
            primary key autoincrement,
    title      TEXT    not null,
    text       TEXT,
    time       TEXT    not null
);