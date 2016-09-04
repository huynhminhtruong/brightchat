var mongoose = require('mongoose');
var Schema = mongoose.Schema();
var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		trim: true
	},
	name: {
		type: String,
		trim: true
	},
	password: {
		type: String,
		trim: true
	}
});

module.exports = mongoose.model('User', UserSchema);