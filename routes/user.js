const express = require('express')
const router = express.Router();
const userService = require("../service/user-service");
const articleService = require("../service/article-service");

router.post('/login', (req, res) => {
    const user = req.body;
    const hash = userService.hashPassword(req.body.password);
    console.log();

    if (
        user.username === undefined || user.username?.trim() === "" ||
        user.role === undefined || user.role?.trim() === "" ||
        user.password === undefined || user.password?.trim() === ""
    ) {
        res.status(400).send("Bad input");
        return;
    }

    const response = {
        token: userService.generateToken(user)
    }
    res.status(201).json(response);
})

router.post('/registration', (req, res) => {
    const user = req.body;

    if (
        user.username === undefined || user.username?.trim() === "" ||
        user.role === undefined || user.role?.trim() === "" ||
        user.password === undefined || user.password?.trim() === ""
    ) {
        res.status(400).send("Bad input");
        return;
    }

    const response = {
        token: userService.generateToken(user)
    }
    res.status(201).json(response);
})

module.exports = router;