const express = require("express");
const router = express.Router();
const reservationServiceService = require('../service/reservation-service')

router.get('/', async (req, res) => {
    const order = req.query.order;
    const reservations = await reservationServiceService.getAll(order);
    res.json(reservations);
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const reservation = await reservationServiceService.getById(id);

    if (reservation) {
        res.json(reservation);
    } else {
        res.status(404).send("Not found");
    }
})

router.post('/', async (req, res) => {
    const data = req.body;
    console.log(req.user);

    if (
        data.title === undefined || data.title.trim() === "" ||
        data.text === undefined || data.text.trim() === ""
    ) {
        res.status(400).send("Bad input");
        return;
    }

    const reservation = await reservationServiceService.create(data);

    res.status(201).json(reservation);
})

router.put('/:id', async (req, res) => {
    const data = req.body;
    const id = parseInt(req.params.id);

    if (
        isNaN(id) ||
        data.title === undefined || data.title.trim() === "" ||
        data.text === undefined || data.text.trim() === ""
    ) {
        res.status(400).send("Bad input");
        return;
    }

    const reservation = await reservationServiceService.update(id, data);

    if (!reservation) {
        res.status(404).send("Not found")
        return;
    }

    res.status(202).json(reservation);
})

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    await reservationServiceService.delete(id);
    res.status(204).send("No Content");
})

module.exports = router;