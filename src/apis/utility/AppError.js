const joi = require("@hapi/joi")
const { Renderer } = require("./Renderer")
const { Messages } = require("../resource/Messages")

function AppError (customMsg, httpCode, data = {

}) {
	this.customMsg = customMsg
	this.httpCode = httpCode
	this.data = data
}

module.exports.AppError = AppError
module.exports.JoiAppError = (expectation, body) => {
	const result = joi.validate(body, expectation)
	if(result.error) {
		throw new AppError(result.error.customMessage || Messages.custom(result.error.details[0].message), 400)
	} else {
		return result.value
	}
}

module.exports.HandleAppError = (error, req, res, next) => {

	if(error instanceof AppError) {
		res.status(error.httpCode).json(Renderer(error.customMsg, error.data))
	} else if(error instanceof Error && error.message) {
		res.status(500).json(Renderer(Messages.custom(error.message), error.data))
	}
	else {
		res.status(500).json(Renderer.render(Messages.unhandledError))
	}
	if(error instanceof Error) {
		next(error)
	} else {
		console.error(error)
	}
}