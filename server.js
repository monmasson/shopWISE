const express = require("express");
const server = express();
const PORT = process.env.PORT || 3002
const morgan = require("morgan")
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mongoConfig = require("./config");
require("dotenv").config()
const bodyParser = require("body-parser")

//IMPORTING AND CALLING PRODUCT ROUTE
const productRoute = express.Router()
server.use('/product', productRoute);


//IMPORTING AND CALLING USER ROUTE
const userRoute = express.Router()
server.use('/user', userRoute);


server.use(morgan("dev"))
server.use(express.json())
server.use(bodyParser.json())






//check that you have your Welcome to the shopping App! message displaying
server.get("/", (req, res) => {
    res.status(200).json({ message: 'Welcome to the shopping App!' });
})



server.listen(PORT, () => {
    mongoConfig()
    console.log(`Server is listening at ${PORT}`)
});
