require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const config = require("../config/config");
const bodyParser = require('body-parser');
const { httpStatusCode } = require("../config/error-tratament");
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


app.use(bodyParser.urlencoded(config.bodyParserUrlEncoded));
app.use(express.json());

//setting cors
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "*");
	res.setHeader("Access-Control-Allow-Headers", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin",
		"X-Requested-With",
		"Content-Type",
		"Accept",
		"Content-Length",
		"Authorization",
		"Accept-Encoding",
		"Access_Token",
		"multipart/form-data"
	);

	if (req.method === 'OPTIONS') {
		res.status(httpStatusCode.SUCCESS_NO_CONTENT).json()
	} else {
		next();
	}
});

//routes
//require('./router')(app)
/*
app.use((req, res, next) => {
	const err = new Error("Not Found")
	res.send('Dominio não encontradp')

	err.status(404)
	next(err)
})
*/

app.use(categoriesRouter);
app.use(customerRouter);
app.use(employeeRouter);
app.use(ordersRouter);
app.use(productRouter);
app.use(sessionRouter);
app.use(storeRouter);

module.exports = app;
