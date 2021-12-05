var express = require('express')
var router = express.Router()
const calculatingModule = require('../BL/calculating')


router.get('/score/:companyId/:userId', async function (req, res) {
    const companyId = req.params.companyId
    const userId = req.params.userId
    const result = await calculatingModule.calculateScoreById(companyId, userId)

    return res.status(result.status).json({msg: result.msg, score: result.score})
})


module.exports = router