create table flights
(
    id integer not null
        constraint flights_pk
            primary key autoincrement,
    name      TEXT    not null,
    capacity   integer not null,
    free_places integer not null,
    date       TEXT    not null,
    time        TEXT    not null,
    flight_progress    TEXT
);