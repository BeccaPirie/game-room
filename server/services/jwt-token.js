const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

// generate token
const generateToken = async(id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = generateToken