const express = require('express')
const { Constants } = require('./Constants')

const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(Constants.port, () => console.log(`Example app listening at http://localhost:${Constants.port}`))