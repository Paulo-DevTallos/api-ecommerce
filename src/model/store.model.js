const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	id_store: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true
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
			}
		},
		geo: {
			type: String,
			coordinate: [],
		}
	},
	created_at: {
		type: Date,
		default: Date.now,
	}
});

const StoreModel = mongoose.model('store', schema);

module.exports = StoreModel;
