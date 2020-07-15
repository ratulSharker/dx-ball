const process = require("process")
const fs = require("fs")

module.exports.Constants = {
	port : process.env.PORT,
	db_path: process.env.DB_PATH,

	token: {
		keys: {
			private: fs.readFileSync(process.env.JWT_PVT_KEY),
			public : fs.readFileSync(process.env.JWT_PUB_KEY)
		},
		timingInSecond: {
			authTokenExpiration: 7 * 24 * 3600, // 7 days
		}
	},

}