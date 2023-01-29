const CustomerModel = require('../models/customer.model');
const OrderModel = require('../models/order.modal');


exports.createOrder = async (req, res) => {
	const newOrder = await CustomerModel.aggregate([
		{
			$match: {
				customer_name: "Rafael Mendes",
			},
		},
		{
			$project: {
				customer_id: "$_id",
				delivery_address: "$purchase_requirements",
				date: Date(),
				products: "$cart.products",
				total_value: {
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
		{ customer_name: "Rafael Mendes" },
		{
			$set: {
				"cart.products": [],
			},
		},
	)

	console.log(newOrder)
	res.json(newOrder)
}

exports.getOrders = async (req, res) => {
	const orders = await OrderModel.find()

	res.json(orders)
}
