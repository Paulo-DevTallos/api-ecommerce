const { httpStatusCode, successStatus, throwNewError } = require('../../config/error-tratament');
const CateroryModel = require('../models/category.model');
const ProductModel = require('../models/product.model');

exports.createCategory = async (req, res) => {
	const { ...data } = req.body;

	const isCategory = await CateroryModel.findOne({ category_name: data.category_name });

	try {
		if (!isCategory) {
			const category = await CateroryModel.create({
				...data,
			})

			res.status(httpStatusCode.CREATED).json({ category, message: successStatus.CREATED.message });

		} else {
			res
			.status(httpStatusCode.CONFLICT)
			.json({ message: throwNewError.EXISTANT_REGISTER.message });
		}
	} catch (error) {
		res
			.status(httpStatusCode.BAD_REQUEST)
			.json({ error, message: throwNewError.REQUEST_FAILED.message });
	}
}

exports.getCategories = async (req, res) => {
	const { id } = req.params;

	const categoryId = id ? { _id: id } : null;

	const category = await CateroryModel.find(categoryId)
		.sort({ category_name: 1 });

	try {
			if (category) res.status(httpStatusCode.OK).json(category);
		} catch (error) {
			res
			.status(httpStatusCode.BAD_REQUEST)
			.json({ error, message: throwNewError.REQUEST_FAILED.message });
		}
}

exports.getProductByCategories = async (req, res) => {
	const { id } = req.params;

	try {
		const productsByCategories = await ProductModel.find().where('category').equals(id)
		res.status(httpStatusCode.OK).json({ productsByCategories, message: successStatus.SUCCESS_OPERATION.message });

	} catch (error) {
		res.status(httpStatusCode.BAD_REQUEST).json({ message: throwNewError.REQUEST_FAILED.message });
	}
}
