const {database} = require("../database/database");

class Reservation_userService {

    async getAll(order = "id") {

        let orderByColumn = order === "reservation_id" ? "reservation_id" : "id";

        return await database().all(
            "SELECT * FROM reservation_user ORDER BY " + orderByColumn
        );
    }

    async getById(id) {
        return await database().get(
            "SELECT * FROM reservation_user WHERE id = ?",
            id
        );
    }

    

    async create(reservation_user) {
        const result = await database().run(
            "INSERT INTO reservation_user (reservation_id, user_id) VALUES (?, ?)",
            reservation_user.reservation_id, reservation_user.user_id
        );
        return await this.getById(result.lastID);
    }

    async update(id, reservation_user) {
        const result = await database().run(
            "UPDATE reservation_user SET reservation_id = ?, user_id = ? WHERE id = ?",
            reservation_user.reservation_id, reservation_user.user_id, id
        );

        if (result.changes === 0) {
            return null;
        } else {
            return await this.getById(id);
        }
    }

    async delete(id) {
        await database().run(
            "DELETE FROM reservation_user WHERE id = ?",
            id
        );
    }
}

module.exports = new Reservation_userService();