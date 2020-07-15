/* global __dirname */

const path = require("path")

const express = require("express")
const morgan = require("morgan")

const { Constants } = require("./Constants")
const { Database } = require("./apis/Database")
const { HandleAppError } = require("./apis/utility/AppError")
const { Renderer } = require("./apis/utility/Renderer")
const { Messages } = require("./apis/resource/Messages")
const { IndexRouter } = require("./apis/routes/IndexRouter")

const app = express()

app.use(morgan("short"))

// Handling game-play
app.use("/", express.static(path.join(__dirname, "game")))
app.use("/css", express.static(__dirname + "../../node_modules/bootstrap/dist/css")) // redirect CSS bootstrap
app.use("/js",  express.static(__dirname + "../../node_modules/bootstrap/dist/js")) // redirect JS bootstrap
app.use("/jquery",  express.static(__dirname + "../../node_modules/jquery/dist")) // redirect JS jquery

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