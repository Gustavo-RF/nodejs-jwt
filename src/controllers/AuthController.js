require('dotenv').config();
const jwt = require('jsonwebtoken');
const generateAccessToken = require('../utils/generateAccessToken')

let refreshTokens = [];

module.exports = {
	login (req, res) {
		const username = req.body.username;
		const password = req.body.password;
	
		const user = { username, password};
	
		const accessToken = generateAccessToken(user);
		const refreshToken = jwt.sign(user, process.env.JWT_SECRET_REFRESH);
	
		refreshTokens.push(refreshToken);
	
		return res.json({ accessToken, refreshToken });
	},

	refresh  (req, res) {
		const refreshToken = req.body.token;
	
		if(refreshToken == null) res.sendStatus(401);
		if(!refreshTokens.includes(refreshToken)) res.sendStatus(403);
	
		jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, (err, user) => {
			if(err) return res.sendStatus(403); // token invalido
	
			const accessToken = generateAccessToken({ username: user.username, password: user.password })
			req.user = user;
	
			return res.json({ accessToken });
		});
	},
	
	logout (req, res) {
		refreshTokens = refreshTokens.filter(token => token !== req.body.token);
		return res.sendStatus(204)
	},

}