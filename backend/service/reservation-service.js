const {database} = require("../database/database");

class ReservationService {

    async getAll(order = "id") {

        let orderByColumn = order === "title" ? "title" : "id";

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
            "INSERT INTO reservations (title, text) VALUES (?, ?)",
            reservation.title, reservation.text
        );
        return await this.getById(result.lastID);
    }

    async update(id, reservation) {
        const result = await database().run(
            "UPDATE reservations SET title = ?, text = ? WHERE id = ?",
            reservation.title, reservation.text, id
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