const express = require("express")
const { RegisterRouter } = require("./RegisterRouter")
const { AuthenticationRouter } = require("./AuthenticationRouter")
const { UserRouter } = require("./UserRouter")
const { ScoreRouter } = require("./ScoreRouter")

const IndexRouter = express.Router()


IndexRouter.use("/v1/register", RegisterRouter)
IndexRouter.use("/v1/authentication", AuthenticationRouter)
IndexRouter.use("/v1/users/me", UserRouter)
IndexRouter.use("/v1/score", ScoreRouter)

module.exports.IndexRouter = IndexRouter