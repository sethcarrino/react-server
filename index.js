const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// require authRoute - shorthand from const authRoutes = require();
// authRoutes(app);
require('./routes/authRoutes')(app);

// writing a variable for handling heroku port environment. 
// setup || to listen if environment is not avaible and for development on separate port
// ex. 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);