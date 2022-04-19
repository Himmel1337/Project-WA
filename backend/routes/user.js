const express = require("express");
const router = express.Router();
const userService = require('../service/user-service')
const reservationService = require("../service/reservation-service");

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

router.post('/', async (req, res) => {
    const data = req.body;
    console.log(req.user);

    if (
        data.username === undefined || data.username?.trim() === "" ||
        data.password === undefined || data.password?.trim() === "" ||
        data.role === undefined || data.role?.trim() === ""
    ) {
        res.status(400).send("Bad input");
        return;
    }

    const user = await userService.create(data);

    res.status(201).json(user);
})

router.put('/:id', async (req, res) => {
    const data = req.body;
    const id = parseInt(req.params.id);

    if (
        isNaN(id) ||
        data.username === undefined || data.username?.trim() === "" ||
        data.password === undefined || data.password?.trim() === "" ||
        data.role === undefined || data.role?.trim() === ""
    ) {
        res.status(400).send("Bad input");
        return;
    }

    const user = await userService.update(id, data);

    if (!user) {
        res.status(404).send("Not found")
        return;
    }

    res.status(202).json(user);
})

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    await userService.delete(id);
    res.status(204).send("No Content");
})

module.exports = router;