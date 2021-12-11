const express = require("express");
const figlet = require('figlet');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const orderRoutes = require("./routes/order.routes")
const productRoutes = require("./routes/product.routes")
require("dotenv").config({path: "./config/.env"});
require("./config/db");
const app = express();

figlet('PalaMarket API - by NotiGate', function(err, data) {
    if (err) {
        return;
    }
    console.log(data)
});

app.use(bodyParser.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api/order", orderRoutes);
app.use("/api/product", productRoutes);

//server
app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
});