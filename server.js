var express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 4000
const calcController = require('./routes/calc')
const getSetController = require('./routes/getSet')
require('dotenv/config')

mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log('connected to the DB!')
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  })
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/v1/calc', calcController)
app.use('/api/v1/details', getSetController)