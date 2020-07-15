const { UserModel } = require("../model/UserModel")
const { Constants } = require("../../Constants")
const jwt = require("jsonwebtoken")

const UserController = {

}

UserController.createUser = (name, email, hashedPassword) => {
	return UserModel.create({
		name: name,
		email: email,
		password: hashedPassword
	})
}

UserController.findUserByEmail = (email) => {
	return UserModel.findOne({
		where: {
			email : email
		}
	})
}

UserController.findUserByEmailAndPass = (email, hashedPassword) => {
	return UserModel.findOne({
		where : {
			email : email,
			password: hashedPassword
		}
	})
}

UserController.tokenForUser = (user) => {

	const iat = new Date().getTime() / 1000
	const exp = iat + Constants.token.timingInSecond.authTokenExpiration
	const payload = {
		iat: iat,
		exp: exp,
		user: user
	}

	return jwt.sign(payload, Constants.token.keys.private, {
		algorithm: "RS256"
	})
}

UserController.updatePassword = (userId, hashedPassword) => {
	return UserModel.update({
		password: hashedPassword
	}, {
		where: {
			id: userId
		}
	})
}

module.exports.UserController = UserController