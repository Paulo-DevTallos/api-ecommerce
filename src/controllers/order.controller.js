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
			console.log(newOrder)
			res.json(newOrder)
		})

	} catch (error) {
		console.log(error)
	}
}

exports.getOrders = async (req, res) => {
	const orders = await OrderModel.find()

	res.json(orders)
}
