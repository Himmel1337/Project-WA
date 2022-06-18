const express = require("express");
const router = express.Router();
const userService = require('../service/user-service')

router.post('/login', async (req, res) => {
    const data = req.body;
    
    if (
        data.username === undefined || data.username.trim() === "" ||
        data.password === undefined || data.password.trim() === ""
    ) {
        res.status(400).send("Bad input");
        return;
    }

    const user = await userService.getByUser(req.body.username);

    if(user == null){
        res.status(403).send("Bad username or password");
        return;
    }

    const hash = userService.hashPassword(data.password);
    const password = user.password;
    
    if (hash != password){
        res.status(403).send("Bad username or password");
        return
    }

    const response = {
        token: userService.generateToken(user)
    };
    res.status(201).json(response);
})

router.post('/', async (req, res) => {
    const data = req.body;

    if (
        data.username === undefined || data.username.trim() === "" ||
        data.password === undefined || data.password.trim() === "" ||
        data.role === undefined || data.role.trim() === ""
    ) {
        res.status(400).send("Bad input");
        return;
    }

    const hash = userService.hashPassword(req.body.password);
    
    data.password = hash;
    const user = await userService.create(data);
    res.status(201).send();
})


router.get('/info', async (req, res) => {
    const tokenPayload = req.user;
    console.log(tokenPayload);
    res.json(tokenPayload);
})

router.get('/', async (req, res) => {
    const order = req.query.order;
    const users = await userService.getAll(order);
    res.json(users);
})


module.exports = router;