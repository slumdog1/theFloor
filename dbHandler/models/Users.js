const mongoose = require('mongoose')

const userDetailsSchema = mongoose.Schema({
    level: Number,
    weights: {}
})

module.exports = mongoose.model('users', userDetailsSchema, 'users')