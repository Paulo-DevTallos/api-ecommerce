const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	id_store: {
		type: Number,
		required: true,
		index: true,
	},
	store_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
	},
	telephone: {
		type: [],
		required: true,
	},
	location: {
		address: {
			street: {
				type: String,
				required: true,
			},
			neighborhood: {
				type: String,
				required: true,
			},
			city: {
				type: String,
				required: true,
			},
			state: {
				type: String,
				required: true,
			},
		},
		geo: {
			type: {
				type: String,
				enum: ["Point"],
			},
			coordinates: {
				type: [Number],
				index: '2dsphere'
			},
		},
	},
	products: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'stores',
		default: []
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

const StoreModel = mongoose.model("stores", schema);

module.exports = StoreModel;
