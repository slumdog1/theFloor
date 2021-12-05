const mongoose = require('mongoose')

const companyDetailsSchema = mongoose.Schema({
    size: Number,
    funding: Number,
    age: Number,
    userScoring: [Number]
})

module.exports = mongoose.model('companyDetails', companyDetailsSchema, 'companyDetails')