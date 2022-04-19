const express = require('express')
const app = express()
const {initializeDatabase} = require('./database/database')
const jwt = require('express-jwt')
const {jwtConfig} = require("./config");
const homepageRouter = require('./routes/homepage')
const reservationRouter = require('./routes/reservation')
const userRouter = require('./routes/user')

initializeDatabase();
app.use(express.json());

app.use('/reservations', jwt(jwtConfig));
app.use('/user/info', jwt(jwtConfig));

app.use('/', homepageRouter);
app.use('/reservations', reservationRouter);
app.use('/user', userRouter);

const port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})