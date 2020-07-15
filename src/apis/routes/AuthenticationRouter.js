const express = require("express")
const { AuthenticationPolicies } = require("../policies/AuthenticationPolicies")
const md5 = require("md5")
const { UserController } = require("../controller/UserController")
const { Renderer } = require("../utility/Renderer")
const { Messages } = require("../resource/Messages")

const AuthenticationRouter = express.Router()


AuthenticationRouter.post("/login",
	async (req, res, next) => {
		try {
			// Following things needed to be done
			// 1. Validate the login request body
			// 2. Search user using `email` & `hashedPassword`.
			// 3. If no user found throw error
			// 4. If user found, then issue a token

			// #1
			const validatedBody = AuthenticationPolicies.validateLoginRequestBody(req.body)

			// #2 - #3
			const user = await AuthenticationPolicies.doNotProceedIfUserNotFoundByEmailAndPassword(validatedBody.email, md5(validatedBody.password))

			// #4
			const token = UserController.tokenForUser(user)

			res.json(Renderer(Messages.loginSuccess, {
				token : token
			}))


		} catch(error) {
			next(error)
		}
	})


AuthenticationRouter.post("/reset-password",
	async (req, res, next) => {
		try {
			// Following thing needed to be done
			// 1. Validate the reset password request body
			// 2. Search user usign email.
			// 3. If no user found, throw error.
			// 4. If user found, reset it's password to `1234`

			// #1
			const validatedBody = AuthenticationPolicies.validateResetPasswordRequestBody(req.body)

			// #2 - #4
			const user = await AuthenticationPolicies.doNotProceedIfUserNotFoundByEmail(validatedBody.email)

			// #4
			await UserController.updatePassword(user.id, md5("1234"))

			res.json(Renderer(Messages.passwordResetted, {

			}))

		} catch(error) {
			next(error)
		}
	})



module.exports.AuthenticationRouter = AuthenticationRouter