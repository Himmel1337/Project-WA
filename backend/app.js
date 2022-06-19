const express = require('express')
const app = express()
const {initializeDatabase} = require('./database/database')
const jwt = require('express-jwt')
const {jwtConfig} = require("./config");
const homepageRouter = require('./routes/homepage')
const reservationsRouter = require('./routes/reservations')
const notificationsRouter = require('./routes/notifications')
const notification_userRouter = require('./routes/notification_user')
const reservation_userRouter = require('./routes/reservation_user')
const userRouter = require('./routes/users')
const fligtsRouter = require('./routes/flights')
const cors = require("cors");
const config = require("./config");

initializeDatabase();
app.use(express.json());
app.use(cors({origin: config.allowedFrontendOrigin}));

app.use('/user/info', jwt(jwtConfig));

app.use('/', homepageRouter);
app.use('/reservations', reservationsRouter);
app.use('/users', userRouter);
app.use('/flights', fligtsRouter);
app.use('/reservation_user', reservation_userRouter)
app.use('/notifications', notificationsRouter);
app.use('/notification_user', notification_userRouter)

const port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})