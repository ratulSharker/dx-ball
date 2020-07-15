const express = require("express")
const { RegisterRouter } = require("./RegisterRouter")
const { AuthenticationRouter } = require("./AuthenticationRouter")

const IndexRouter = express.Router()


IndexRouter.use("/v1/register", RegisterRouter)
IndexRouter.use("/v1/authentication", AuthenticationRouter)

module.exports.IndexRouter = IndexRouter