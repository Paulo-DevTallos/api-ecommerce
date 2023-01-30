const {
	httpStatusCode,
	successStatus,
	throwNewError
} = require('../../config/error-tratament');
const CustomerModel = require('../models/customer.model');
const OrderModel = require('../models/order.modal');


exports.createOrder = async (req, res) => {
	const { id } = req.params;

	const customer = await CustomerModel.find({ _id: id });

	try {
		customer.forEach(async field => {
			const newOrder = await CustomerModel.aggregate([
				{
					$match: {
						customer_name: field.customer_name,
					},
				},
				{
					$project: {
						customer_id: "$_id",
						delivery_address: "$purchase_requirements", //ver abordagem para utilizar current address
						creted_at: Date(),
						products: "$cart.products",
						purchase_total: {
							$sum: "$cart.products.price"
						}
					}
				},
				{
					$merge: "orders"
				}
			])

			// limpar carrinho de compras
			await CustomerModel.updateOne(
				{ customer_name: field.customer_name },
				{
					$set: {
						"cart.products": [],
					},
				},
			)

			res
				.status(httpStatusCode.SUCCESS_NO_CONTENT)
				.json({ newOrder, message: successStatus.UPDATED_RESOURCE.message });
		})

	} catch (error) {
		res
			.status(httpStatusCode.BAD_REQUEST)
			.json({ error, message: throwNewError.REQUEST_FAILED.message });
	}
}

exports.getOrders = async (req, res) => {
	const orders = await OrderModel.find()

	res.json(orders)
}
