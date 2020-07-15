/* global __dirname */

const path = require("path")

const express = require("express")
const morgan = require("morgan")

const { Constants } = require("./Constants")
const { Database } = require("./apis/Database")
const { HandleAppError, AppError } = require("./apis/utility/AppError")
const { Renderer } = require("./apis/utility/Renderer")
const { Messages } = require("./apis/resource/Messages")
const { IndexRouter } = require("./apis/routes/IndexRouter")
const { isPublicRoute } = require("./apis/utility/PublicRoutes")
const { AuthenticationPolicies } = require("./apis/policies/AuthenticationPolicies")

const app = express()

app.use(morgan("short"))

// Handling game-play
app.use("/", express.static(path.join(__dirname, "game")))
app.use("/lib/css", express.static(__dirname + "../../node_modules/bootstrap/dist/css")) // redirect CSS bootstrap
app.use("/lib/js",  express.static(__dirname + "../../node_modules/bootstrap/dist/js")) // redirect JS bootstrap
app.use("/lib/jquery",  express.static(__dirname + "../../node_modules/jquery/dist")) // redirect JS jquery

// Handling api
app.use(express.json(), (error, req, res, next) => {
	if(error) {
		res.status(error.status)
		res.json(Renderer(Messages.custom(error.type), {
			body: error.body
		}))
	} else {
		next()
	}
})

app.use( async (req, res, next) => {
	try {

		// Following things needed to be done
		// 1. Check that, req.originalUrl is public or not
		//	1.1 if public, allow to next
		// 2. Verify the token, inject `userId` into the request
		// 3. proceed.

		// #1
		if(isPublicRoute(req.method, req.originalUrl)) {
			// #1.1
			next()
			return
		}

		// #2
		const token = req.get("Authorization")
		if(!token || token == "") {
			throw new AppError(Messages.unAuthorizedUserOrInvalidRoute, 400, {

			})
		}

		const payload = AuthenticationPolicies.verifyTokenSign(token)
		req.userId = payload.user.id

		next()

	} catch(error) {
		next(error)
	}
})

app.use("/api", IndexRouter)

app.use(HandleAppError)

async function main() {
	console.log("Authenticate DB")
	await Database.authenticate()

	console.log("Sycn DB")
	await Database.sync()

	app.listen(Constants.port, () => {
		console.log(`Access DX-BALL http://localhost:${Constants.port}/`)
	})
}


main()