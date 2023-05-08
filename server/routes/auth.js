const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt")
const generateToken = require("../services/jwt-token")

router.get("/", (req, res) => {
    res.send("auth route")
})

// REGISTER
router.post("/register", async (req, res) => {
    try {
        // check password is valid
        if(req.body.password.length < 6) {
            return res.status(400).json("Password must contain at least 6 characters")
        }
        if(req.body.password !== req.body.confirmPassword) {
            return res.status(400).json("Passwords don't match")
        }

        // check username is valid
        if(req.body.username.length < 3 || req.body.username.length > 20) {
            return res.status(400).json("Username must be between 3 and 20 characters")
        }

        // check if user exists
        const checkUsername = await User.findOne({username: req.body.username})
        if(checkUsername) return res.status(409).json("Username is taken!")

        const checkEmail = await User.findOne({email: req.body.email})
        if(checkEmail) return res.status(409).json("Account already exists!")

        // generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        // create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        
        // save user and respond
        const user = await newUser.save();

        // generate JWT tokens
        const token = generateToken(user._id).toString()

        // update user with JWT tokens
        await user.updateOne({
            $set: {
                token: token
            }
        })

        res.status(200).json(user);
    }
    catch(err) {
        res.status(500).json(err);
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email:req.body.email})
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!user || !validPassword) return res.status(404).json("Username or password incorrect")

        // generate new jwt token
        const token = await generateToken(user._id)

        // update user with new token
        await user.updateOne({
            $set: {
                token: token
            }
        })

        res.status(200).json(user);
    }
    catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router