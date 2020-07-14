/* global __dirname */

const express = require("express")
const { Constants } = require("./Constants")
const path = require("path")

const app = express()


app.use("/", express.static(path.join(__dirname, "game")))
app.use("/css", express.static(__dirname + "../../node_modules/bootstrap/dist/css")) // redirect CSS bootstrap
app.use("/js",  express.static(__dirname + "../../node_modules/bootstrap/dist/js")) // redirect JS bootstrap
app.use("/jquery",  express.static(__dirname + "../../node_modules/jquery/dist")) // redirect JS jquery


app.get("/api", (req, res) => res.send("Hello World!"))

app.listen(Constants.port, () => console.log(`Example app listening at http://localhost:${Constants.port}`))