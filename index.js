const express = require("express");
const fs = require("fs");

const {connectMongoDB} = require('./connection')
const {logReqRes} = require('./middlewares')

const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;
//Connection
connectMongoDB('mongodb://127.0.0.1:27017/yash-app').then(() => console.log("MongoDB connected"))

//Middleware - Plugin
app.use(express.urlencoded({extended: false}));
app.use(logReqRes('log.txt'));

//Routes
app.use('/api/users',userRouter);

app.listen(PORT, ()=> console.log(`Server started at ${PORT}`))
