const express = require("express");
const router = express.Router();
const flightService = require('../service/flight-service')

router.get('/', async (req, res) => {
    const order = req.query.order;
    const flights = await flightService.getAll(order);
    res.json(flights);
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const flight = await flightService.getById(id);

    if (flight) {
        res.json(flight);
    } else {
        res.status(404).send("Not found");
    }
})

router.post('/', async (req, res) => {
    const data = req.body;
    console.log(req.flight);

    if (
        data.name === undefined || data.name.trim() === "" ||
        isNaN(data.capacity) || 
        data.date === undefined || data.date.trim() === "" ||
        data.time === undefined || data.time.trim() === "" 
    ) {
        res.status(400).send("Bad input");
        return;
    }

    const flight = await flightService.create(data);

    res.status(201).json(flight);
})

router.put('/:id', async (req, res) => {
    const data = req.body;
    const id = parseInt(req.params.id);

    if (
        isNaN(id) ||
        data.name === undefined || data.name.trim() === "" ||
        isNaN(data.capacity) ||
        data.date === undefined || data.date.trim() === "" ||
        data.time === undefined || data.time.trim() === ""
    ) {
        res.status(400).send("Bad input");
        return;
    }

    const flight = await flightService.update(id, data);

    if (!flight) {
        res.status(404).send("Not found")
        return;
    }

    res.status(202).json(flight);
})

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    await flightService.delete(id);
    res.status(204).send("No Content");
})

module.exports = router;