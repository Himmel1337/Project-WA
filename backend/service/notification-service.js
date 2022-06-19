const {database} = require("../database/database");

class NotificationService {

    async getAll(order = "id") {

        let orderByColumn = order === "id" ? "id" : "id";

        return await database().all(
            "SELECT * FROM notifications ORDER BY id DESC"
        );
    }

    async getById(id) {
        return await database().get(
            "SELECT * FROM notifications WHERE id = ?",
            id
        );
    }

    async create(notification) {
        const result = await database().run(
            "INSERT INTO notifications (name, text, type) VALUES (?, ?, ?)",
            notification.name, notification.text, notification.type
        );
        return await this.getById(result.lastID);
    }

    async update(id, notification) {
        const result = await database().run(
            "UPDATE notifications SET name = ?, text = ?, type = ? WHERE id = ?",
            notification.name, notification.text, notification.type, id
        );

        if (result.changes === 0) {
            return null;
        } else {
            return await this.getById(id);
        }
    }

    async delete(id) {
        await database().run(
            "DELETE FROM notifications WHERE id = ?",
            id
        );
    }
}

module.exports = new NotificationService();