const passport = require('passport');

// exporting apps to use in index.js
module.exports = (app) => {
	app.get(
		'/auth/google', passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	app.get('/auth/google/callback', passport.authenticate('google'));
};