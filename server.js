///////////////
// CONSTANTS //
///////////////

const express = require("express");
const server = express();
const PORT = process.env.PORT || 3002
const morgan = require("morgan")
const cors = require("cors");
const mongoConfig = require("./config");
require("dotenv").config()

////////////////
// MIDDLEWARE //
////////////////
server.use(morgan("dev"))
server.use(express.json())


//IMPORTING AND CALLING PRODUCT ROUTE
const productRoute = require("./Routes/productRoute")
server.use('/product', productRoute);


//IMPORTING AND CALLING USER ROUTE
const userRoute = require("./Routes/userRoute")
server.use('/user', userRoute);

//IMPORTING AND CALLING EXTRA ROUTE
const extraRoute = require("./Routes/extraRoute")
server.use('/extra', extraRoute);


//check that you have your Welcome to the shopping App! message displaying
server.get("/", (req, res) => {
    res.status(200).json({ message: 'Welcome to the shopping App!' });
})

server.listen(PORT, () => {
    mongoConfig()
    console.log(`Server is listening at ${PORT}`)
});
