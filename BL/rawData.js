const queries = require('../dbHandler/queries/queries')

async function getUserAndDefaultSettings(userId) {
    const userConfig = await queries.getUserConfigById(userId)
    const adminConfig = await queries.getAdminConfig()
    userWeights = userConfig.weights
    adminWeights = adminConfig.weights

    return {userWeights, adminWeights}
}

async function setUserDefaults(userId, new_weights) {
    const adminConfig = await queries.getAdminConfig()
    const adminId = adminConfig._id.toString()

    // check unauthorized operation
    if (userId === adminId && 'userScoring' in new_weights) return {status: 403, msg: "unauthorized to change the userScoring default!"}
    
    // check unsuitable input
    let sumOfWeights = 0
    for (const [key, value] of Object.entries(new_weights)) {
        sumOfWeights += value
    }
    
    if (sumOfWeights > 1 || sumOfWeights < 0) return {status: 400, msg: "Sum of weights is not 1.0!"}

    try {
        await queries.updateWeightsForUser(userId, new_weights)
        return {status: 200, msg: "succeeded"}
    } catch {
        return {status: 400, msg: "could not update weights!"}
    }
}

module.exports = { getUserAndDefaultSettings, setUserDefaults }