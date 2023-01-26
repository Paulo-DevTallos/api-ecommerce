const { httpStatusCode, successStatus, throwNewError } = require('../../config/error-tratament');
const StoreModel = require('../models/store.model');

exports.createStore = async (req, res) => {
	const { ...data } = req.body;

	const isStore = await StoreModel.findOne({ id_store: data.id_store });

	try {
		if (!isStore) {
			const store = await StoreModel.create({
				...data,
			})

			res
				.status(httpStatusCode.CREATED)
				.json({ store, message: successStatus.CREATED.message });
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

exports.getStores = async (req, res) => {
	const { id } = req.params;

	const storeId = id ? { _id: id } : null;

	const store = await StoreModel.find(storeId)
		.hint("id_store_1")
		.sort({ created_at: 1 });

	try {
		if (store) res.status(httpStatusCode.OK).json(store);
	} catch (error) {
		res
			.status(httpStatusCode.BAD_REQUEST)
			.json({ message: throwNewError.REQUEST_FAILED.message });
	}
}
