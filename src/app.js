require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const config = require("../config/config");
const bodyParser = require('body-parser');
const path = require('path');
const { httpStatusCode, throwNewError } = require("../config/error-tratament");
require("../src/models");

const app = express();
//router imports
const categoriesRouter = require('./routes/categories');
const customerRouter = require("./routes/customers");
const employeeRouter = require('./routes/employee');
const ordersRouter = require('./routes/orders');
const productRouter = require("./routes/products");
const sessionRouter = require("./routes/session");
const storeRouter = require("./routes/store");

//watching logs requests
app.use(logger("dev"));

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(bodyParser.urlencoded(config.bodyParserUrlEncoded));
app.use(express.json());

//setting cors
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "*");
	res.setHeader("Access-Control-Allow-Headers", "*");

	if (req.method === 'OPTIONS') {
		res.status(httpStatusCode.SUCCESS_NO_CONTENT).json()
	} else {
		next();
	}
});


app.use(categoriesRouter);
app.use(customerRouter);
app.use(employeeRouter);
app.use(ordersRouter);
app.use(productRouter);
app.use(sessionRouter);
app.use(storeRouter);


// not found
app.use((req, res, next) => {
	const err = new Error(throwNewError.ROUTE_NOT_FOUND)
	res.sendStatus(httpStatusCode.NOT_FOUND)

	next(err)
})

module.exports = app;
