const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017')
	.then(() => {
		console.log('Connected to the database successfully...');
	}, (e) => {
		console.log('Error connecting to the database...', e);
	});

module.exports = {
	mongoose
};
