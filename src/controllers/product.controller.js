const {
	httpStatusCode,
	throwNewError,
	successStatus,
} = require("../../config/error-tratament");
const ProductModel = require("../models/product.model");

exports.createProduct = async (req, res) => {
	const { ...data } = req.body;

	const isProduct = await ProductModel.findOne({ id_product: data.id_product });

	try {
		if (!isProduct) {
			const product = await ProductModel.create({
				...data,
			});

			res
				.status(httpStatusCode.CREATED)
				.json({ product, message: successStatus.CREATED.message });
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

exports.getProductByQueryParam = async (req, res) => {
	const { code, name, brand } = req.query;

	try {
		const productQuery = await ProductModel.find({
			$or: [
				{
					'id_product': { $in: code }
				},
				{
					'model': { $in: name }
				},
				{
					'brand': { $in: brand }
				}
			]
		});

		res.status(httpStatusCode.OK).json(productQuery);

	} catch (error) {
		res
			.status(httpStatusCode.BAD_REQUEST)
			.json({ error, message: throwNewError.REQUEST_FAILED.message });
	}
}

exports.filterStoreByProducts = async (req, res) => {
	const { ...data } = req.body

	const filterStore = await ProductModel.aggregate([
		{
			$match: {
				model: "Iphone 13",
			}
		},
		{
			$lookup: {
				from: "stores",
				localField: "sales_at",
				foreignField: "_id",
				as: "stores"
			}
		}
	])


	console.log(filterStore)
	res.json(filterStore)
}

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

// para alimentar o carrinho é necessario realizar uma busca e fazer uma atualizacao:
// para decrementar pode utilizar o $inc passando um negativo para o campo
// db.products.findOneAndUpdate({
//   model: "Iphone 13",
//   quantity: {
//     $gt: 0
//   }
// }, {
//   $inc: {
//     quantity: -1
//   }
// })

exports.removeProduct = async (req, res) => {
	const { id} = req.params;

	const isProduct = await ProductModel.findById({ _id: id });
	try {
		if (isProduct) {
			const remove = await ProductModel.deleteOne(isProduct);

			res
				.status(httpStatusCode.SUCCESS_NO_CONTENT)
				.json({ remove, message: successStatus.REMOVED_RESOURCE.message });
		}
	} catch (error) {
		res
			.status(httpStatusCode.BAD_REQUEST)
			.json({ error, message: throwNewError.REQUEST_FAILED.message });
	}
}
