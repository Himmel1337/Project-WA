const express = require('express');
const app = express();
const {initializeDatabase} = require('./database/database');
const homepageRouter = require('./routes/homepage');
const articlesRouter = require('./routes/articles');
const userRouter = require("./routes/user");
const {jwtConfig} = require("./config");
const jwt = require("express-jwt");

initializeDatabase();

app.use(express.json());

app.use('/articles', jwt(jwtConfig));

app.use('/', homepageRouter);
app.use('/articles', articlesRouter);
app.use('/user', userRouter);

const port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})