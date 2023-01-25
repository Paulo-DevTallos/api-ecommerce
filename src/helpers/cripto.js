const bcrypt = require('bcrypt');

class Encript {
	static async CriptoPassword(pass) {
		const salt = await bcrypt.genSalt();
		return await bcrypt.hash(pass, salt);
	}

	static async ComparePassword(pass, customerPass) {
		return bcrypt.compare(pass, customerPass);
	}
}

module.exports = {
	Encript,
}
