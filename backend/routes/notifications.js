const express = require("express");
const router = express.Router();
const notificationService = require('../service/notification-service')

router.get('/', async (req, res) => {
    const order = req.query.order;
    const notifications = await notificationService.getAll(order);
    res.json(notifications);
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const notification = await notificationService.getById(id);

    if (notification) {
        res.json(notification);
    } else {
        res.status(404).send("Not found");
    }
})

router.post('/', async (req, res) => {
    const data = req.body;
    console.log(req.notification);

    if (
        data.name === undefined || data.name.trim() === "" ||
        data.text === undefined || data.text.trim() === "" ||
        data.type === undefined || data.type.trim() === ""
    ) {
        res.status(400).send("Bad input");
        return;
    }

    const notification = await notificationService.create(data);

    res.status(201).json(notification);
})

router.put('/:id', async (req, res) => {
    const data = req.body;
    const id = parseInt(req.params.id);

    if (
        isNaN(id) ||
        data.name === undefined || data.name.trim() === "" ||
        data.text === undefined || data.text.trim() === "" ||
        data.type === undefined || data.type.trim() === "" 
    ) {
        res.status(400).send("Bad input");
        return;
    }

    const notification = await notificationService.update(id, data);

    if (!notification) {
        res.status(404).send("Not found")
        return;
    }

    res.status(202).json(notification);
})

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    await notificationService.delete(id);
    res.status(204).send("No Content");
})

module.exports = router;