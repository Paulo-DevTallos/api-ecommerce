const fs = require('fs');
const validFileTypes = ['js'];
const router = require('express').Router();

const requireFilesRouters = (routerDir, app) => {
	fs.readdirSync(routerDir).forEach(fileName => {
		const checkValidFileTypes = validFileTypes.indexOf(fileName.split('.').pop()) === -1

		if (fileName === 'index.js' && routerDir === __dirname || checkValidFileTypes) {
			return;
		}

		require(`${routerDir}/${fileName}`)(app)
	})
}


module.exports = router, function(app) {
	requireFilesRouters(__dirname, app)
};
