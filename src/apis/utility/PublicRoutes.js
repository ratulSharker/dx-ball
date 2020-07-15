const PublicRoutes = [
	{
		verb: "POST",
		path: /^\/api\/v1\/register$/
	},
	{
		verb: "POST",
		path: /^\/api\/v1\/authentication\/login$/
	},
	{
		verb: "POST",
		path: /^\/api\/v1\/authentication\/reset-password$/
	}
]

module.exports.isPublicRoute = (verb, path) => {
	return PublicRoutes.findIndex((item) => {
		return item.verb == verb && item.path.test(path)
	}) > -1
}