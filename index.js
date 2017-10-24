const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send({ bye: 'buddy' });
});

// writing a variable for handling heroku port environment. 
// setup || to listen if environment is not avaible and for development on separate port
// ex. 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);