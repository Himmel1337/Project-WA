const {database} = require("../database/database");

class reservationService {

    async getAll(order = "id") {
        // Never use the user's order directly! It may contain SQL injection.
        // Cannot use binding with "?" for ORDER BY, hence, must validate the order manually using a condition.
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
            return null; // not found
        } else {
            return await this.getById(id); // the updated reservation
        }
    }

    async delete(id) {
        await database().run(
            "DELETE FROM reservations WHERE id = ?",
            id
        );
    }
}

module.exports = new reservationService();