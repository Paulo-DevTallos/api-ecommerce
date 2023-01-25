require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const db = require("./db");
const app = express();
//router imports
const customerRouter = require("./routes/customers");
const storeRouter = require("./routes/store");

//database connection
db.dbConnection();

//watching logs requests
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setting cors
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "*");
	res.setHeader("Access-Control-Allow-Headers", "*");
	res.setHeader("Content-Type", "multipart/form-data");

	next();
});

//routes
app.use(customerRouter);
app.use(storeRouter);

module.exports = app;
