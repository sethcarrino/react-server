const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// pulling in model class for users
const User = mongoose.model('users');

// add identifying piece of info to cookie
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => {
			done(null, user);
		});
});

// this passport service will authenticate user through google oAuth
passport.use(new GoogleStrategy({
	clientID: keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	callbackURL: '/auth/google/callback',
	// if our request runs through proxy just deal with it
	proxy: true
	}, 
	(accessToken, refreshToken, profile, done) => {
		// console logging google profile details
		// console.log('accessToken', accessToken);
		// console.log('refreshToken', refreshToken);
		// console.log('profile:', profile);

		// mongoose query to find if a user matches id
		// returns a promise
		User.findOne({ googleId: profile.id })
			.then((existingUser) => {
				if (existingUser) {
					// we already have a record with given profile ID
					// first argument is error object
					// second object is user record
					done(null, existingUser);
				} else {
					// we don't have user record and create a new one
					// .save() will take instance and save record
					new User({ googleId: profile.id })
						.save()
						.then(user => done(null, user));
				}
			});

		
	})
);