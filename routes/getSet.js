var express = require('express')
var router = express.Router()
const rawData = require('../BL/rawData')

// define the home page route
router.get('/user/:userId', async function (req, res) {
  const userId = req.params.userId
  const result = await rawData.getUserAndDefaultSettings(userId)
  res.json(result)
})
// define the about route
router.patch('/defaults', async function (req, res) {
  const user_id = req.body.userId;
  const new_weights = req.body.weights

  const result = await rawData.setUserDefaults(user_id, new_weights)
  res.status(result.status).json(result.msg)
})


module.exports = router