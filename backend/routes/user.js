const express = require("express");
const router = express.Router();
const userService = require('../service/user-service')

router.post('/login', async (req, res) => {

    const user = await userService.getByUsername(req.body.username);
    const response = {
        token: userService.generateToken(user)
    };

    res.status(201).json(response)
})

router.post('/', async (req, res) => {

    const hash = userService.hashPassword(req.body.password);
    console.log(hash);

    res.status(201).send();
})

router.get('/info', async (req, res) => {
    const tokenPayload = req.user;
    console.log(tokenPayload);
    res.json(tokenPayload);
})

module.exports = router;