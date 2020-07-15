const joi = require("@hapi/joi")
const { UtilityPolicies } = require("./UtilityPolicies")
const { JoiAppError, AppError } = require("../utility/AppError")
const { UserController } = require("../controller/UserController")
const { Messages } = require("../resource/Messages")
const { Constants } = require("../../Constants")
const jwt = require("jsonwebtoken")

const AuthenticationPolicies = {

}



AuthenticationPolicies.validateLoginRequestBody = (body) => {
	const ExpectedLoginRequestBody = joi.object({
		email : UtilityPolicies.joiEmailValidationKey,
		password: UtilityPolicies.joiPasswordValidationKey
	})

	return JoiAppError(ExpectedLoginRequestBody, body)
}

AuthenticationPolicies.validateResetPasswordRequestBody = (body) => {
	const ExpectedResetPasswordRequestBody = joi.object({
		email : UtilityPolicies.joiEmailValidationKey
	})

	return JoiAppError(ExpectedResetPasswordRequestBody, body)
}


AuthenticationPolicies.doNotProceedIfUserNotFoundByEmailAndPassword = async  (email, hashedPassword) => {
	const user = await UserController.findUserByEmailAndPass(email, hashedPassword)

	if(!user) {
		throw new AppError(Messages.userNotFound, 404, {
		})
	}

	return user
}

AuthenticationPolicies.doNotProceedIfUserNotFoundByEmail = async (email) => {
	const user = await UserController.findUserByEmail(email)

	if(!user) {
		throw new AppError(Messages.userNotFound, 404, {
		})
	}

	return user
}


AuthenticationPolicies.verifyTokenSign = (token) => {
	try {
		const payload = jwt.verify(token, Constants.token.keys.public, {
			algorithms: "RS256"
		})

		if(!payload) {
			throw new AppError(Messages.unAuthorizedUser, 401, {

			})
		}
		return payload
	} catch (error) {
		console.log(error)
		throw new AppError(Messages.unAuthorizedUser, 401, {

		})
	}

}


module.exports.AuthenticationPolicies = AuthenticationPolicies