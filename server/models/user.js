const mongoose = require("mongoose");
const TopScoresSchema = require("./TopScores");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        min:3,
        max: 20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique: true
    },
    password:{
        type:String,
        required: true,
        min:6
    },
    profilePicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    points:{
        type:Number,
        default:0
    },
    lastPlayed:{
        type:String,
        default:""
    },
    favGames:{
        type: Array,
        default:[]
    },
    recentGames:{
        type: Array,
        default:[]
    },
    topScores:[TopScoresSchema],
    isAdmin:{
        type:Boolean,
        default:false
    },
    token: {
        type: String,
        default: ''
    }
},
{timestamps:true}
);

module.exports = mongoose.model("User", UserSchema);