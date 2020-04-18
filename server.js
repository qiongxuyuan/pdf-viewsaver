const express = require('express')
const app = express()
const dot = require('dotenv');
dot.config()
const port = process.env.PORT

const {getTestDB} = require('./mongodbOps')

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/testdb', getTestDB);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))