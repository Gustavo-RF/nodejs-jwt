require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
	authenticateToken(req, res, next) {
		const auth = req.headers['authorization'];
		const token = auth && auth.split(' ')[1];
	
		if(token == null) {
			return res.sendStatus(401);
		}
	
		jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
			if(err) return res.sendStatus(403); // token invalido
	
			req.user = user;
	
			next();
		});
	}	
}