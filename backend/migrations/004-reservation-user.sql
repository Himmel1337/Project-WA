create table reservation_user
(
    id integer not null
        constraint reservations_pk
            primary key autoincrement,
    reservation_id integer not null
        constraint reservation_user_reservations_fk
            references reservations (id),
    user_id        integer not null
        constraint reservation_user_users_fk
            references users (id)
);
