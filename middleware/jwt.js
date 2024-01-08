const jwt = require("jsonwebtoken")
require('dotenv').config();

const secretToken = (username) => {
    return jwt.sign({username},process.env.SECRET)
}

module.exports = {secretToken}