const express = require("express");
const fs = require("fs");
require('dotenv').config()

const {connectMongoDB} = require('./connection')
const {logReqRes} = require('./middlewares')

const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;
//Connection
connectMongoDB(process.env.MONGO_URI).then(() => console.log("MongoDB connected"))

//Middleware - Plugin
app.use(express.urlencoded({extended: false}));
app.use(logReqRes('log.txt'));

//Routes
app.use('/api/users',userRouter);

app.listen(PORT, ()=> console.log(`Server started at ${PORT}`))
