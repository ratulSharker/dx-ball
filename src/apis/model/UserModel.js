const { Database } = require("../Database")
const Sequelize= require("sequelize")

const UserModel = Database.define("user", {

	name: {
		type: Sequelize.STRING,
		allowNull: false
	},

	email: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			isEmail: {
				msg: "invalid email provided"
			}
		},
		unique: true
	},

	password: {
		type: Sequelize.STRING,
		validate: {
			notEmpty: {
				msg: "password cannot be empty"
			}
		},
		get() {
			return () => { return this.getDataValue("password") }
		}
	}

}, {
	freezeTableName : true,
	tableName: "user"
})


module.exports.UserModel = UserModel