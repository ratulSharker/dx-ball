const joi = require("@hapi/joi")
const { UtilityPolicies } = require("./UtilityPolicies")
const { Messages } = require("../resource/Messages")
const { JoiAppError, AppError } = require("../utility/AppError")
const { UserController } = require("../controller/UserController")

const RegistrationPolicies = {

}

RegistrationPolicies.validateRegisterNewUserRequestBody = (body) => {
	const ExpectedRegisterNewUserRequestBody = joi.object({
		name : UtilityPolicies.genericNonEmptyRequiredStringKey(Messages.nameEmpty, Messages.nameRequired),
		email: UtilityPolicies.joiEmailValidationKey,
		password: UtilityPolicies.joiPasswordValidationKey
	})
	return JoiAppError(ExpectedRegisterNewUserRequestBody, body)
}

RegistrationPolicies.doNotProceedIfUserExistsWithGivenEmail = async (email)  => {
	const user = await UserController.findUserByEmail(email)

	if(user) {
		throw new AppError(Messages.userAlreadyExistsWithGivenEmail, 409, {
		})
	}
}



module.exports.RegistrationPolicies = RegistrationPolicies