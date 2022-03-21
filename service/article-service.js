const {database} = require("../database/database");

class ArticleService {

    async getAll(order = "id") {
        // Never use the user's order directly! It may contain SQL injection.
        // Cannot use binding with "?" for ORDER BY, hence, must validate the order manually using a condition.
        let orderByColumn = order === "title" ? "title" : "id";

        return await database().all(
            "SELECT * FROM articles ORDER BY " + orderByColumn
        );
    }

    async getById(id) {
        return await database().get(
            "SELECT * FROM articles WHERE id = ?",
            id
        );
    }

    async create(article) {
        const result = await database().run(
            "INSERT INTO articles (title, text) VALUES (?, ?)",
            article.title,
            article.text
        );
        return await this.getById(result.lastID);
    }

    async update(id, article) {
        const result = await database().run(
            "UPDATE articles SET title = ?, text = ? WHERE id = ?",
            article.title, article.text, id
        );

        if (result.changes === 0) {
            return null;
        } else {
            return await this.getById(id);
        }
    }

    async delete(id) {
        await database().run (
            "DELETE FROM articles WHERE id = ?",
            id
        )
    }
}

module.exports = new ArticleService();