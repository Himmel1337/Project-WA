const express = require('express')
const app = express()
const {initializeDatabase} = require('./database/database')
const jwt = require('express-jwt')
const {jwtConfig} = require("./config");
const homepageRouter = require('./routes/homepage')
const reservationsRouter = require('./routes/reservations')
const userRouter = require('./routes/user')
const fligtsRouter = require('./routes/flights')
const cors = require("cors");
const config = require("./config");

// set up everything
initializeDatabase();
app.use(express.json());
app.use(cors({origin: config.allowedFrontendOrigin}));

// protect routes against unauthorized access
// app.use('/reservations', jwt(jwtConfig));
app.use('/user/info', jwt(jwtConfig));

// register all routes
app.use('/', homepageRouter);
app.use('/reservations', reservationsRouter);
app.use('/user', userRouter);
app.use('/flights', fligtsRouter);

// start the app on the given port
const port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})