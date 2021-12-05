const queries = require('../dbHandler/queries/queries')
const scores = require('./scores')


function calculateFields(companyDetails) {
    for (const [key, value] of Object.entries(companyDetails)) {
        result = scores.getScoreByAttr(key, value)
        companyDetails[key] = result
    }
}

async function calculateScoreById(companyId, userId) {
    try {
    const companyDetails = await queries.getCompanyDetailsById(companyId)
    } catch {
        return {status: 400, msg: "company details were not found!", score: 0}
    }
    calculateFields(companyDetails)
    
    try {
    const userConfig = await queries.getUserConfigById(userId)
    } catch {
        return {status: 400, msg: "user was not found!", score: 0}
    }

    try {
    const adminConfig = await queries.getAdminConfig()
    } catch {
        return {status: 400, msg: "no admin was found in the system", score: 0}
    }
    userWeights = userConfig.weights
    adminWeights = adminConfig.weights

    let resultScore = 0;
    for (const [key, value] of Object.entries(adminWeights)) {
        if (key in userWeights) {
            resultScore += userWeights[key]*companyDetails[key]
        } else {
            resultScore += adminWeights[key]*companyDetails[key]
        }
    }
    return {status: 200, msg: "", score: resultScore}
    
}

module.exports = { calculateScoreById }



/*

    const newCompany = new companyDetails({
        size: 100,
        funding: 10000000,
        age: 10,
        userScoring: [2, 3, 4]
    })
    newCompany.save().then(() => { console.log("saved")})

    */