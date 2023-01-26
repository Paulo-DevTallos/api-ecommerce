const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	id_product: {
		type: Number,
		required: true,
		index: true,
	},
	model: {
		type: String,
		required: true,
	},
	brand: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	sistem: {
		type: String,
		required: true,
	},
	memory: {
		type: String,
		required: true,
	},
	product_referencie: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
	},
	optional_infos: {
		type: mongoose.Schema.Types.Mixed,
		default: [],
	},
	price: {
		type: mongoose.Schema.Types.Decimal128,
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

const ProductModel = mongoose.model("products", schema);

module.exports = ProductModel;
