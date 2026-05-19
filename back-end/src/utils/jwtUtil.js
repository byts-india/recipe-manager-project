const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRY });
}

module.exports = generateToken;