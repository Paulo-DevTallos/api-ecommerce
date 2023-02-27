require("dotenv").config();

module.exports = {
	bodyParserUrlEncoded: {
		extended: true
	},
	development: {
		host_connection: process.env.DB_URL_STRING_CONNECTION,
	},
	production: {
		host_prod_connection: '',
	}
};
