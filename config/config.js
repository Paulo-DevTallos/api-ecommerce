require("dotenv").config();

module.exports = {
	bodyParserUrlEncoded: {
		extended: true,
		limit: '50mb',
	},
	development: {
		host_dev_connection: process.env.DB_URL_STRING_CONNECTION,
	},
	production: {
		host_prod_connection: '',
	}
};
