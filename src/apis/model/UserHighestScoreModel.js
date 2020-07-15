const { Database } = require("../Database")
const Sequelize = require("sequelize")
const { UserModel } = require("./UserModel")

const UserHighestScoreModel = Database.define("user_highest_score", {
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		unique: true
	},

	score: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
}, {
	freezeTableName: true,
	tableName: "user_highest_score"
})


UserHighestScoreModel.belongsTo(UserModel, {
	foreignKey: {
		name: "userId",
		allowNull: false
	}
})

module.exports.UserHighestScoreModel = UserHighestScoreModel