create table notifications
(
    id   integer not null
        constraint notifications_pk
            primary key autoincrement,
    name TEXT    not null,
    text TEXT    not null,
    type TEXT    not null
);

