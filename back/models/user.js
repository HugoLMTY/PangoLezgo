const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    uname: {
        type: String,
        required: true
    }
    ,
    pwd: {
        type: String,
        required: true
    }
    ,
    name: {
        type: String,
        required: true
    }
    ,
    age: {
        type: Number,
        required: true
    }
    ,
    family: {
        type: String,
        required: true
    }
    ,
    race: {
        type: String,
        required: true
    }
    ,
    feeding: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)
