const mongoose = require("mongoose")

const GameSchema = new mongoose.Schema({
    name:{
        type:String,
        require: true,
        min:3,
        max: 20,
        unique:true
    },
    thumbnail:{
        type:String,
        default:""
    }
},
{timestamps:true}
);

module.exports = mongoose.model("games", GameSchema);