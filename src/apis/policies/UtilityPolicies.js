const joi = require("@hapi/joi")
const { Messages } = require("../resource/Messages")

const UtilityPolicies = {

}

UtilityPolicies.joiEmailValidationKey = joi.string().empty().email().required().error(errors => {
	const err = Error()
	errors.forEach(error => {
		// list of errors: refs: https://github.com/hapijs/joi/blob/v15.0.3/API.md#list-of-errors
		switch (error.type) {
		case "any.empty":
			err.customMessage = Messages.emailEmpty
			return err
		case "string.email":
			err.customMessage = Messages.emailInvalid
			return err
		case "any.required":
			err.customMessage = Messages.emailRequired
			return err
		default:
			console.log("Unhandled case")
			console.log(error)
			err.customMessage = Messages.unhandledError
			return err
		}
	})
	return err
})

UtilityPolicies.joiPasswordValidationKey = joi.string().empty().min(4).required().error(errors => {
	const err = Error()
	errors.forEach(error => {
		switch (error.type) {
		case "any.empty":
			err.customMessage = Messages.passwordEmpty
			return err
		case "string.min":
			err.customMessage = Messages.passwordMinLength
			return err
		case "any.required":
			err.customMessage = Messages.passwordRequired
			return err
		default:
			console.log("Unhandled case")
			console.log(error)
			err.customMessage = Messages.unhandledError
			return err
		}
	})
	return err
})

UtilityPolicies.genericPositiveRequiredNumberKey = (requiredCustomErrMessage, invalidNumberErrMessage) => {
	return joi.number().min(0).required().error(errors => {
		const err = Error()
		errors.forEach(error => {
			switch (error.type) {
			case "any.required":
				err.customMessage = requiredCustomErrMessage
				return err
			case "number.base":
			case "number.min":
				err.customMessage = invalidNumberErrMessage
				return err
			default:
				console.log("Unhandled case")
				console.log(error)
				err.customMessage = Messages.unhandledError
				return err
			}
		})
		return err
	})
}

UtilityPolicies.genericNonEmptyRequiredStringKey = (emptyCustomErrMessage, requiredCustomErrMessage) => {
	return joi.string().empty().required().error(errors => {
		const err = Error()
		errors.forEach(error => {
			switch (error.type) {
			case "any.empty":
				// TODO: write api test case
				err.customMessage = emptyCustomErrMessage
				return err
			case "any.required":
				err.customMessage = requiredCustomErrMessage
				return err
			case "string.base":
				err.customMessage = requiredCustomErrMessage
				return err
			default:
				console.log(error)
				err.customMessage = Messages.unhandledError
				return err
			}
		})
		return err
	})
}

module.exports.UtilityPolicies = UtilityPolicies