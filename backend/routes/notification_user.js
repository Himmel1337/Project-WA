const express = require("express");
const router = express.Router();
const notification_userService = require('../service/notification_user-service')

router.get('/', async (req, res) => {
    const order = req.query.order;
    const notification_users = await notification_userService.getAll(order);
    res.json(notification_users);
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const notification_user = await notification_userService.getById(id);

    if (notification_user) {
        res.json(notification_user);
    } else {
        res.status(404).send("Not found");
    }
})

router.post('/', async (req, res) => {
    const data = req.body;
    console.log(req.notification_user);

    if (
        isNaN(data.archive) ||
        isNaN(data.notification_id) ||
        isNaN(data.user_id)
    ) {
        res.status(400).send("Bad input");
        return;
    }

    const notification_user = await notification_userService.create(data);

    res.status(201).json(notification_user);
})

router.put('/:id', async (req, res) => {
    const data = req.body;
    const id = parseInt(req.params.id);

    if (
        isNaN(id) ||
        isNaN(data.archive) ||
        isNaN(data.notification_id) ||
        isNaN(data.user_id)
    ) {
        res.status(400).send("Bad input");
        return;
    }

    const notification_user = await notification_userService.update(id, data);

    if (!notification_user) {
        res.status(404).send("Not found")
        return;
    }

    res.status(202).json(notification_user);
})

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    await notification_userService.delete(id);
    res.status(204).send("No Content");
})

module.exports = router;