const {database} = require("../database/database");

class FlightService {

    async getAll(order = "id") {

        let orderByColumn = order === "title" ? "title" : "id";

        return await database().all(
            "SELECT * FROM flights ORDER BY " + orderByColumn
        );
    }

    async getById(id) {
        return await database().get(
            "SELECT * FROM flights WHERE id = ?",
            id
        );
    }

    async create(flight) {
        const result = await database().run(
            "INSERT INTO flights (title, text, time) VALUES (?, ?, ?)",
            flight.title, flight.text, flight.time
        );
        return await this.getById(result.lastID);
    }

    async update(id, flight) {
        const result = await database().run(
            "UPDATE flights SET title = ?, text = ?, time = ? WHERE id = ?",
            flight.title, flight.text, flight.time, id
        );

        if (result.changes === 0) {
            return null;
        } else {
            return await this.getById(id);
        }
    }

    async delete(id) {
        await database().run(
            "DELETE FROM flights WHERE id = ?",
            id
        );
    }
}

module.exports = new FlightService();