const mongoose = require('mongoose')

const TopScoresSchema = new mongoose.Schema({
    gameId:{
        type:String,
        required:true
    },

    score:{
        type:Number,
        default:0
    }
})

module.exports = TopScoresSchema