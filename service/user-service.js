const {jwtConfig, passwordConfig} = require("../config");
const jwt = require("jsonwebtoken")
const {database} = require("../database/database");
const crypto = require("crypto");

class UserService {

    generateToken(user) {
        const tokenPayload = {
            username: user.username,
            role: user.role,
            password: user.password,
        };
        return jwt.sign(
            tokenPayload,
            jwtConfig.secret,
            {
                algorithm: jwtConfig.algorithms[0]
            }
        )
    }

    hashPassword(password) {
        return crypto.pbkdf2Sync(
            password,
            passwordConfig.salt,
            passwordConfig.iterations,
            passwordConfig.keylen,
            passwordConfig.digest,
        ).toString("hex");
    }

    // async createUser(user){
    //     const result = await database().run(
    //         "INSERT INTO users (username, role, password) VALUES (?, ?, ?)",
    //         user.username,
    //         user.role,
    //         user.password
    //     );
    //     return await this.getById(result.lastID);
    // }

}


module.exports = new UserService();