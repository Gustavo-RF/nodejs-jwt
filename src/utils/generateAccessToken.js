require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function generateAccessToken(user) {
	return jwt.sign(user, process.env.JWT_SECRET, { 
		expiresIn: '30s'
	});
}