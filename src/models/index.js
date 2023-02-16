const db = require('../db');
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
let collectionsDir = {}

const uri = process.env.DB_URL_STRING_CONNECTION;

db.dbConnection(uri);

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
		);
	})
	.forEach((file) => {
		collectionsDir = require(path.join(__dirname, file))
		/*const model = require(path.join(__dirname, file));
		db[model.name] = model;
		console.log(file)*/
	});

module.exports = db, collectionsDir;
