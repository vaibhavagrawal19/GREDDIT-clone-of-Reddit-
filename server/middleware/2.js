app.post('/verifyOTP', (req, res) => {
	const phone = req.body.phone;
	const accessToken = jwt.sign({ phone }, process.env.JWT_AUTH_TOKEN, { expiresIn: '30s' });
	res.status(200).cookie('accessToken', accessToken, {
		expires: new Date(new Date().getTime() + 30 * 1000),
		sameSite: 'strict',
		httpOnly: true
	});
}); 