const {
	httpStatusCode,
	throwNewError,
	successStatus,
} = require("../../config/error-tratament");
const ProductModel = require("../models/product.model");

exports.createProduct = async () => {
	const { ...data } = req.body;

	const isProduct = await ProductModel.findOne({ idProduct: data.id_product });

	try {
		if (isProduct) {
			res
				.status(httpStatusCode.CONFLICT)
				.json({ message: throwNewError.EXISTANT_REGISTER.message });
		} else {
			const product = await ProductModel.create({
				...data,
			});

			res
				.status(httpStatusCode.CREATED)
				.json({ product, message: successStatus.CREATED.message });
		}
	} catch (error) {
		res
			.status(httpStatusCode.BAD_REQUEST)
			.json({ error, message: throwNewError.BAD_REQUEST.message });
	}
};

exports.getProducts = async (req, res) => {
	const { id } = req.params;

	const productId = id ? { _id: id } : null;

	const product = await ProductModel.find(productId)
		.hint("id_product_1")
		.sort({ created_at: 1 });

	try {
		if (product) res.status(httpStatusCode.OK).json(product);
	} catch (error) {
		res
			.status(httpStatusCode.BAD_REQUEST)
			.json({ error, message: throwNewError.REQUEST_FAILED.message });
	}
};

/**
 *
 *  Ver regra de negocio a qual isso ser'a necessario
 *
 *  para criar o update de quantidade de produtos
 *  é preciso caturar o campo quantidade utilizando
 *  updateMany || updateOne({ model: "any product" },
 * 	{$set: { quantity: Number }}
 *  )
 *
 */
