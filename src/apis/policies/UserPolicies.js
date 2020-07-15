const joi = require("@hapi/joi")
const { UtilityPolicies } = require("./UtilityPolicies")
const { Messages } = require("../resource/Messages")
const { JoiAppError } = require("../utility/AppError")

const UserPolicies = {

}


UserPolicies.validateUpdateHighestScoreRequestBody = (body) => {
	const ExpectedUpdateHighestScoreRequestBody = joi.object({
		score: UtilityPolicies.genericPositiveRequiredNumberKey(Messages.scoreRequired, Messages.scoreInvalid)
	})

	return JoiAppError(ExpectedUpdateHighestScoreRequestBody, body)
}


module.exports.UserPolicies = UserPolicies