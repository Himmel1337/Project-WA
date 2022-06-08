const express = require("express");
const router = express.Router();
const userService = require('../service/user-service')

router.post('/login', async (req, res) => {
    // TODO
    // 1. verify input data, throw 400 if something is missing
    // 2. compare the password to the hash stored in the database, throw 401 or 403 if credentials incorrect

    const user = await userService.getByUsername(req.body.username);
    const response = {
        token: userService.generateToken(user)
    };

    res.status(201).json(response)
})

router.post('/', async (req, res) => {
    // TODO
    // 1. verify input data, throw 400 if something is missing
    // 2. persist the new user in the database
    // 3. store a hash of the password in the database instead of the plain password to prevent a leak
    // 4. then use the same hashing function in the login endpoint to compare the entered password to the stored hash

    const hash = userService.hashPassword(req.body.password);
    console.log(hash);

    res.status(201).send();
})

router.get('/info', async (req, res) => {
    // this is how to get the currently logged-in user and their data
    const tokenPayload = req.user;
    console.log(tokenPayload);
    res.json(tokenPayload);
})

module.exports = router;