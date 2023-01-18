const mongoose = require('mongoose')

const ScoresSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },

    score:{
        type:Number,
        default:0
    }
})

module.exports = ScoresSchema