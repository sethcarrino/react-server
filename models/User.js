const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String
});

// first argumnet is collection name
// second argument is calling created schema to collection
mongoose.model('users', userSchema);