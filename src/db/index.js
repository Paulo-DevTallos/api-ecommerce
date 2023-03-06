const mongoose = require('mongoose');
const ENV_DB_PATH = process.env.NODE_ENV || "development"
const config = require(__dirname + '/../../config/config.js')[ENV_DB_PATH]

mongoose.set('strictQuery', true);

const dbConnection = () => {
	mongoose.connect(config.host_dev_connection || config.host_prod_connection);

	const db = mongoose.connection

	db.once('open', () => {
		console.log('connected to database');
	})

	db.on('error', console.error.bind(console, 'conection error'))
}

module.exports = {
	dbConnection,
}
