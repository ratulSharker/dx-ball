const express = require("express")
const { RegistrationPolicies } = require("../policies/RegistrationPolicies")
const md5 = require("md5")
const { UserController } = require("../controller/UserController")
const { Renderer } = require("../utility/Renderer")
const { Messages } = require("../resource/Messages")

const RegisterRouter = express.Router()


RegisterRouter.post("/", async (req, res, next) => {
	try {
		// Following things needed to be done.
		// 1. Validate the request body.
		// 2. Check if there any user exists, if exists then throw error.
		// 3. Create user with the email - name - password.
		// 4. Generate token for the user.

		// #1
		const validatedBody = RegistrationPolicies.validateRegisterNewUserRequestBody(req.body)

		// #2
		await RegistrationPolicies.doNotProceedIfUserExistsWithGivenEmail(validatedBody.email)

		// #3
		const hashedPassword = md5(validatedBody.password)
		const user = await UserController.createUser(validatedBody.name, validatedBody.email, hashedPassword)

		// #4
		const token = UserController.tokenForUser(user)

		res.json(Renderer(Messages.registrationSuccess, {
			token: token
		}))

	} catch(error) {
		next(error)
	}
})

module.exports.RegisterRouter = RegisterRouter