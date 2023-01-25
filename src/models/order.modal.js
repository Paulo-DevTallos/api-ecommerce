const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	order_code: {
		type: Number,
		required: true,
	},
	customer_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "customers",
		required: true,
	},
	products: {
		type: mongoose.Schema.Types.Mixed,
		default: [],
	},
	purchase_total: {
		type: mongoose.Types.Decimal128(Number),
		required: true,
	},
	delivery_address: {
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
		observations: {
			type: String,
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

const OrderModel = mongoose.model("orders", schema);

module.exports = OrderModel;
