const CustomerModel = require('../models/customer.model');
const OrderModel = require('../models/order.modal');


exports.createOrder = async (req, res) => {
	// passar id do customer para tratar na questão do carrinho
	const newOrder = await CustomerModel.aggregate([
		{
			$match: {
				customer_name: "Rafael Mendes",
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
