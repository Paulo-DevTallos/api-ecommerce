const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	userKey: {
		type: String,
		required: true,
	},
	jwt: {
		type: String,
		required: true,
	},
	expires_at: {
		type: Date,
		default: Date.now,
		expires: "24h"
	}
})

const SessionModel = mongoose.model('sessions', schema);

module.exports = SessionModel;
