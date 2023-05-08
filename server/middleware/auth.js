const jwt = require('jsonwebtoken')
const User = require("../models/User")

// verify jwt
const protect = async (req, res, next) => {
    let token
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            // get token
            token = req.headers.authorization.split(' ')[1]
            
            // verify token
            jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
                if(err) {
                    console.error(err)
                }
                // get user from token
                req.user = await User.findById(decoded.id).select('-password')
                next()
            })
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

module.exports = protect