const { httpStatusCode, successStatus, throwNewError } = require('../../config/error-tratament');
const SessionModel = require('../models/session.model');

exports.createSession = async (req, res) => {
	const { userKey, jwt } = req.body

	try {
		const session = await SessionModel.create({
			userKey,
			jwt
		})

		res
			.status(httpStatusCode.CREATED)
			.json({ session, message: successStatus.CREATED.message });

	} catch (error) {
		res
			.status(httpStatusCode.BAD_REQUEST)
			.json({ error, message: throwNewError.REQUEST_FAILED.message });
	}
}

exports.getSessions = async (req, res) => {
	try {
		const sessions = await SessionModel.find()

		res.status(httpStatusCode.OK).json(sessions)
	} catch (error) {
		res
			.status(httpStatusCode.BAD_REQUEST)
			.json({ error, message: throwNewError.REQUEST_FAILED.message });
	}
}

exports.updateSession = async (req, res) => {
	const { id } = req.params;

	try {
		const session = await SessionModel.findByIdAndUpdate(
			{ _id: id },
			{
				$set: req.body
			},
			{ new: true },
		)

		res
			.status(httpStatusCode.SUCCESS_NO_CONTENT)
			.json({ session, message: successStatus.UPDATED_RESOURCE.message });

	} catch (error) {
		res
			.status(httpStatusCode.BAD_REQUEST)
			.json({ error, message: throwNewError.REQUEST_FAILED.message });
	}
}

exports.removeSession = async (req, res) => {
	const { id } = req.params;

	try {
		const session = await SessionModel.findById({ _id: id });

		if (session) {
			await SessionModel.deleteOne(session);

			res
				.status(httpStatusCode.SUCCESS_NO_CONTENT)
				.json(successStatus.REMOVED_RESOURCE.message);
		}
	} catch (error) {
		res
			.status(httpStatusCode.BAD_REQUEST)
			.json({ error, message: throwNewError.REQUEST_FAILED.message });
	}
}
