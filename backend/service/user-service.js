const {database} = require("../database/database");
const {passwordConfig, jwtConfig} = require("../config");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

class UserService {

    async getByUsername(username) {
        return await database().get(
            "SELECT * FROM users WHERE username = ?",
            username
        );
    }

    generateToken(user) {
        const tokenPayload = {
            username: user.username,
        };
        return jwt.sign(
            tokenPayload,
            jwtConfig.secret,
            {
                algorithm: jwtConfig.algorithms[0]
            }
        );
    }

    hashPassword(password) {
        return crypto.pbkdf2Sync(
            password,
            passwordConfig.salt,
            passwordConfig.iterations,
            passwordConfig.keylen,
            passwordConfig.digest
        ).toString(`hex`);
    }

    async getById(id) {
        return await database().get(
            "SELECT * FROM users WHERE id = ?",
            id
        );
    }

    async create(user) {
        const result = await database().run(
            "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
            user.username, user.password, user.role
        );
        return await this.getById(result.lastID);
    }

    async update(id, user) {
        const result = await database().run(
            "UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?",
            user.username, user.password, user.role, id
        );

        if (result.changes === 0) {
            return null; // not found
        } else {
            return await this.getById(id); // the updated article
        }
    }

    async delete(id) {
        await database().run(
            "DELETE FROM users WHERE id = ?",
            id
        );
    }
}

module.exports = new UserService();