
const Sequelize = require("sequelize")
const { Constants } = require("../Constants")


module.exports.Database = new Sequelize({
	dialect: "sqlite",
	storage: Constants.db_path
})
