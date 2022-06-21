const {database} = require("../database/database");

class FlightService {

    async getAll(order = "id") {

        let orderByColumn = order === "name" ? "name" : "id";

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
            "INSERT INTO flights (name, capacity, free_places, date, time, flight_progress) VALUES (?, ?, ?, ?, ?, ?)",
            flight.name, flight.capacity, flight.free_places, flight.date, flight.time, flight.flight_progress
        );
        return await this.getById(result.lastID);
    }

    async update(id, flight) {
        const result = await database().run(
            "UPDATE flights SET name = ?, capacity = ?, free_places = ?, date = ?, time = ?, flight_progress = ? WHERE id = ?",
            flight.name, flight.capacity, flight.free_places, flight.date, flight.time, flight.flight_progress, id
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