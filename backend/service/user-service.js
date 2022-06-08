const {database} = require("../database/database");
const {passwordConfig, jwtConfig} = require("../config");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

class UserService {

    async getByUser(username, password) {
        return await database().get(
            "SELECT * FROM users WHERE username = ?",
            username
        );
    }
    
    generateToken(user) {
        const tokenPayload = {
            username: user.username,
            role: user.role
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

}

module.exports = new UserService();