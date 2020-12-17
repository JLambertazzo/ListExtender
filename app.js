'use strict'
const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, '/pub')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pub/index.html'))
})

app.get('/examples', (req, res) => {
  res.sendFile(path.join(__dirname, 'pub/examples.html'))
})

app.get('/documentation', (req, res) => {
  res.sendFile(path.join(__dirname, 'pub/documentation.html'))
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log('listening on port: ' + port)
})