require("dotenv").config();

module.exports = {
	development: {
		database: process.env.DB_URL_STRING_CONNECTION,
		set_timestamp: {
			timestamp: true,
		},
		timezone: "-03:00",
	},
};
