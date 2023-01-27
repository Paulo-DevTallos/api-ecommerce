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
		console.log(error)
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

exports.getStoresByLocation = async (req, res) => {
	const { ...data } = req.body;

	const coordinates = {
		lat: data.location.geo.coordinates[0],
		lng: data.location.geo.coordinates[1],
	}

	//criar regra para setar um raio dinamicamente
	//trabalhar metodos de atualizacao por mongo query
	const distances = {
		max: 300000,
		min: 0
	}

	try {
		const findByLocation = await StoreModel.aggregate([
			{
				$geoNear: {
					near: { type: 'Point', coordinates: [coordinates.lat, coordinates.lng] },
					distanceField: 'Distance',
					maxDistance: distances.max,
					maxDistance: distances.min,
					spherical: true
				}
			}
		])

		console.log(findByLocation);
		res
			.status(httpStatusCode.OK)
			.json({ findByLocation, message: successStatus.SUCCESS_OPERATION.message });

	} catch (error) {
		console.log(error);
		res
			.status(httpStatusCode.BAD_REQUEST)
			.json({ message: throwNewError.REQUEST_FAILED.message });
	}
}
