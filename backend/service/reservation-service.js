const {database} = require("../database/database");

class ReservationService {

    async getAll(order = "id") {

        let orderByColumn = order === "name" ? "name" : "id";

        return await database().all(
            "SELECT * FROM reservations ORDER BY " + orderByColumn
        );
    }

    async getById(id) {
        return await database().get(
            "SELECT * FROM reservations WHERE id = ?",
            id
        );
    }

    async create(reservation) {
        const result = await database().run(
            "INSERT INTO reservations (name, flight_id) VALUES (?, ?)",
            reservation.name, reservation.flight_id
        );
        return await this.getById(result.lastID);
    }

    async update(id, reservation) {
        const result = await database().run(
            "UPDATE reservations SET name = ?, flight_id = ? WHERE id = ?",
            reservation.name, id
        );

        if (result.changes === 0) {
            return null;
        } else {
            return await this.getById(id);
        }
    }

    async delete(id) {
        await database().run(
            "DELETE FROM reservations WHERE id = ?",
            id
        );
    }
}

module.exports = new ReservationService();