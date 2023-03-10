const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const dbConnection = (uri) => {
	mongoose.connect(uri);

	const db = mongoose.connection

	db.once('open', () => {
		console.log('connected to database');
	})

	db.on('error', console.error.bind(console, 'conection error'))
}

module.exports = {
	dbConnection,
}
