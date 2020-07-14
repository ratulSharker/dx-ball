const express = require('express')
const { Constants } = require('./Constants')
const path = require("path")

const app = express()

app.use('/', express.static(path.join(__dirname, 'game')))
app.get('/api', (req, res) => res.send('Hello World!'))

app.listen(Constants.port, () => console.log(`Example app listening at http://localhost:${Constants.port}`))