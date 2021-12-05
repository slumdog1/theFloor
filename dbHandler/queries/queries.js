const { ObjectId } = require('mongoose/node_modules/mongodb/lib/bson')
const companyDetails = require('../models/companyDetails')
const Users = require('../models/Users')


async function getCompanyDetailsById(id) {
    const result = await companyDetails.findOne({_id: ObjectId(id)})
    return result.toObject()
}

async function getUserConfigById(id) {
    const result = await Users.findOne({_id: ObjectId(id)})
    return result.toObject()
}

async function getAdminConfig() {
    const result = await Users.findOne({level: 0})
    return result.toObject()
}

async function updateWeightsForUser(userId, new_weights) {
    const result = await Users.findOneAndUpdate({_id: ObjectId(userId)}, {weights: new_weights})
    return result
}

 module.exports = { getCompanyDetailsById, getUserConfigById, getAdminConfig, updateWeightsForUser }