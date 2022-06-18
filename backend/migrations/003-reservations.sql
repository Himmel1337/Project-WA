create table reservations
(
    id integer not null
        constraint reservations_pk
            primary key autoincrement,
    title           TEXT    not null,
    flight_id      integer
        constraint reservations_flights_fk
            references flights
);