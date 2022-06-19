const express = require("express");
const router = express.Router();
const reservation_userService = require('../service/reservation_user-service')

router.get('/', async (req, res) => {
    const order = req.query.order;
    const reservation_users = await reservation_userService.getAll(order);
    res.json(reservation_users);
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const reservation_user = await reservation_userService.getById(id);

    if (reservation_user) {
        res.json(reservation_user);
    } else {
        res.status(404).send("Not found");
    }
})

router.post('/', async (req, res) => {
    const data = req.body;
    console.log(req.reservation_user);

    if (
        isNaN(data.reservation_id) ||
        isNaN(data.user_id)
    ) {
        res.status(400).send("Bad input");
        return;
    }

    const reservation_user = await reservation_userService.create(data);

    res.status(201).json(reservation_user);
})

router.put('/:id', async (req, res) => {
    const data = req.body;
    const id = parseInt(req.params.id);

    if (
        isNaN(id) ||
        isNaN(data.reservation_id) ||
        isNaN(data.user_id)
    ) {
        res.status(400).send("Bad input");
        return;
    }

    const reservation_user = await reservation_userService.update(id, data);

    if (!reservation_user) {
        res.status(404).send("Not found")
        return;
    }

    res.status(202).json(reservation_user);
})

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    await reservation_userService.delete(id);
    res.status(204).send("No Content");
})

module.exports = router;