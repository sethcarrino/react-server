const express = require('express');
const mongoose = require('mongoose');
// give us access to using cookies
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

// the order of these require statements is correct. will load in right order
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

// making use of cookie session
// wiring up middleware
app.use(
	cookieSession({
		// how long cookie can last before expiring
		// set for 30 days
		maxAge: 30 * 24 * 60 * 60 * 1000,
		// used to encrypt cookie
		keys: [keys.cookieKey]
	})
);

// telling passport to use cookies for authentication
app.use(passport.initialize());
app.use(passport.session());

// require authRoute - shorthand from const authRoutes = require();
// authRoutes(app);
require('./routes/authRoutes')(app);

// writing a variable for handling heroku port environment. 
// setup || to listen if environment is not avaible and for development on separate port
// ex. 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);