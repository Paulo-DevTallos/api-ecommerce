const {
	httpStatusCode,
	throwNewError,
	successStatus,
} = require("../../config/error-tratament");
const ProductModel = require("../models/product.model");
const StoreModel = require("../models/store.model");

// const models = require("../models");
// const { ProductModel, StoreModel } = models;

/**
 * criando dados do produto
 *
 * @param {*} req
 * @param {*} res
 *
 */
exports.createProduct = async (req, res) => {
	const imagePath = req.file?.filename;
	const { ...data } = req.body;

	console.log(imagePath)

	const isProduct = await ProductModel.findOne({ id_product: data.id_product });

	try {
		if (!isProduct) {
			const product = await ProductModel.create({
				...data,
				imagePath,
				/*sales_at: data.sales_at ? [data.sales_at] : []*/
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

/**
 *
 * @param req
 * @param res
 *
 */
exports.getPaginatedProducts = async (req, res) => {
	let { limit, page, sort } = req.query;
	let sortProp = sort || 'id_product';

	// convertendo query de paginação
	limit = Number(limit);
	page = Number(page);

	/**
	 * if queryParams exists sortProp is converted into an Array
	 * if positions 1 = sortProp[1]'desc' arg exists
	 * default statement 'asc'
	 *
	 * possible queries sort:
	 * created_at / price / model - A to Z (revert)
	 *
	 **/
	sort ? (sortProp = sort.split(',')) : (sortProp = [sortProp])

	let sortBy = {}

	if (sortProp[1]) {
		sortBy[sortProp[0]] = sortProp[1];
	}
	else sortBy[sortProp[0]] = 'asc';

	try {
		if (!limit) limit = 5;
		if (!page) page = 0;

		const products = await ProductModel.find()
			.hint("id_product_1")
			.limit(limit)
			.skip(page)
			.sort(sortBy)
			.populate("category", "category_name");

		const countProducts = await ProductModel.countDocuments();

		// criando urls de paginação
		const currentPath = req.route.path;
		const currentUrl = currentPath + `?limit=${limit}&page=${page}`;

		const nextItem = page + limit;
		const nextUrl = nextItem < countProducts ? `${currentPath}?limit=${limit}&page=${nextItem}` : null;

		const previous = page - limit < 0 ? null : page - limit;
		const previousUrl = previous != null ? `${currentPath}?limit=${limit}&page=${previous}` : null;

		res.status(httpStatusCode.OK).json({
			nextUrl,
			currentUrl,
			previousUrl,
			limit,
			page,
			currentPage: page,
			countProducts,
			products,
		});
	} catch (error) {
		console.log(error);
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
					id_product: { $in: code },
				},
				{
					model: { $in: name },
				},
				{
					brand: { $in: brand },
				},
			],
		});

		res.status(httpStatusCode.OK).json(productQuery);
	} catch (error) {
		res
			.status(httpStatusCode.BAD_REQUEST)
			.json({ error, message: throwNewError.REQUEST_FAILED.message });
	}
};

exports.filterProductsByStore = async (req, res) => {
	const { id } = req.params;

	try {
		const filterStore = await StoreModel.findOne({ _id: id });

		const productList = await ProductModel.find({ sales_at: filterStore });

		res.status(httpStatusCode.OK).json(productList);
	} catch (error) {
		res
			.status(httpStatusCode.BAD_REQUEST)
			.json({ error, message: throwNewError.REQUEST_FAILED.message });
	}
};

exports.updateProduct = async (req, res) => {
	const { id } = req.params;
	const { ...data } = req.body;

	const isProduct = await ProductModel.findById({ _id: id });

	try {
		if (isProduct) {
			await ProductModel.updateOne(
				{ _id: isProduct._id },
				{
					$set: data,
				},
				{ new: true }
			);

			res
				.status(httpStatusCode.SUCCESS_NO_CONTENT)
				.json({ message: successStatus.UPDATED_RESOURCE.message });
		} else {
			res
				.status(httpStatusCode.NOT_FOUND)
				.json({ message: throwNewError.RESOURCE_NOT_FOUND.message });
		}
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
	const { id } = req.params;

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
};
