create table reservation_user
(
    reservations_id integer not null
        constraint reservation_user_reservations_fk
            references reservations (id),
    users_id        integer not null
        constraint reservation_user_users_fk
            references users (id)
);
