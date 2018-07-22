const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
	email: {
		type: String,
		required: true, // meaniing that the attribute should be there. Otherwise, a vlidationerror will be thrown
		minlength: 1,
		trim: true
	}
}));

module.exports = {
	User
};
