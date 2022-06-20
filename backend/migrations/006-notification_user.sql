create table notification_user
(
    id integer not null
        constraint notifications_pk
            primary key autoincrement,
    archive        integer not null,
    notification_id integer not null
        constraint notification_user_notification_fk
            references notifications (id),
    user_id        integer not null
        constraint notification_user_users_fk
            references users (id)

);
