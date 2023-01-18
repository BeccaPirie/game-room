const mongoose = require("mongoose");
const ScoresSchema = require("./Scores");

const GameSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        min:3,
        max: 20,
        unique:true
    },
    thumbnail:{
        type:String,
        default:""
    },
    scores:[ScoresSchema]
},
{timestamps:true}
);

module.exports = mongoose.model("Game", GameSchema);