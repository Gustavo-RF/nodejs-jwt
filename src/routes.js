const express = require('express');

const authMiddleware = require('./middleware/Auth');
const PostController = require('./controllers/PostController');
const AuthController = require('./controllers/AuthController');

const routes = express.Router();

routes.get('/posts',authMiddleware.authenticateToken, PostController.index)

routes.post('/login', AuthController.login);
routes.post('/refreshtoken', AuthController.refresh);
routes.delete('/logout', AuthController.logout);

module.exports = routes;