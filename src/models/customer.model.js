const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	customer_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	buy_requirements: {
		cpf: {
			type: String,
		},
		telephone: {
			type: [],
		},
		location: {
			street: {
				type: String,
			},
			zipcode: {
				type: String,
			},
			neighborhood: {
				type: String,
			},
			city: {
				type: String,
			},
		},
	},
	cart: {
		products: {
			type: mongoose.Schema.Types.Mixed,
			default: [],
		},
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

const CustomerModel = mongoose.model("customers", schema);

module.exports = CustomerModel;
