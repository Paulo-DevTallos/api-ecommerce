const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	category_name: {
		type: String,
		required: true,
	},
});

const CateroryModel = mongoose.model('categories', schema);

module.exports = CateroryModel;
