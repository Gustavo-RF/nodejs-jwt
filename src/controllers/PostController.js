module.exports = {
	index(req, res) {
		const posts = [
			{
				"username": "Gustavo",
				"title": "Post 1"
			},
			{
				"username": "Gustavo 2",
				"title": "Post 1"
			},
			{
				"username": "Gustavo",
				"title": "Post 1"
			},
			{
				"username": "Gustavo 2",
				"title": "Post 1"
			},
			{
				"username": "Gustavo",
				"title": "Post 1"
			},
			{
				"username": "Gustavo 2",
				"title": "Post 1"
			},
		];
		return res.json(posts.filter(post => post.username === req.user.username));
	}
}

