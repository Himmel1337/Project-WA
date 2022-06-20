const {database} = require("../database/database");

class Notification_userService {

    async getAll(order = "id") {

        return await database().all(
            "SELECT * FROM notification_user ORDER BY id DESC"
        );
    }

    async getById(id) {
        return await database().get(
            "SELECT * FROM notification_user WHERE id = ?",
            id
        );
    }



    async create(notification_user) {
        const result = await database().run(
            "INSERT INTO notification_user (archive, notification_id, user_id) VALUES (?, ?, ?)",
            notification_user.archive, notification_user.notification_id, notification_user.user_id
        );
        return await this.getById(result.lastID);
    }

    async update(id, notification_user) {
        const result = await database().run(
            "UPDATE notification_user SET archive = ? WHERE id = ?",
            notification_user.archive,  id
        );

        if (result.changes === 0) {
            return null;
        } else {
            return await this.getById(id);
        }
    }

    async delete(id) {
        await database().run(
            "DELETE FROM notification_user WHERE id = ?",
            id
        );
    }
}

module.exports = new Notification_userService();