const express = require('express')
const app = express()
const {initializeDatabase} = require('./database/database')
const jwt = require('express-jwt')
const {jwtConfig} = require("./config");
const homepageRouter = require('./routes/homepage')
const reservationsRouter = require('./routes/reservations')
const reservation_userRouter = require('./routes/reservation_user')
const userRouter = require('./routes/user')
const fligtsRouter = require('./routes/flights')
const cors = require("cors");
const config = require("./config");

initializeDatabase();
app.use(express.json());
app.use(cors({origin: config.allowedFrontendOrigin}));

app.use('/user/info', jwt(jwtConfig));

app.use('/', homepageRouter);
app.use('/reservations', reservationsRouter);
app.use('/user', userRouter);
app.use('/flights', fligtsRouter);
app.use('/reservation_user', reservation_userRouter)

const port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})