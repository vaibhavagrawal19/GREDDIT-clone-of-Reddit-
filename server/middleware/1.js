app.post('/', (req, res) => {
	res.cookie('AccessToken', 'jwt_access_token', {
		expires: new Date(new Date().getTime() + 30 * 1000),
		sameSite: 'strict',
		httpOnly: true
	});
	res
		.cookie('RefreshToken', 'JWT_REFRESh_TOKEN', {
			expires: new Date(new Date().getTime() + 31557600000),
			sameSite: 'strict',
			httpOnly: true
		})
		.send('hello');
	
});