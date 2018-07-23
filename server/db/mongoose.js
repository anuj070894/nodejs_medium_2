const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log('Connected to the database successfully...');
	}, (e) => {
		console.log('Error connecting to the database...', e);
	});

module.exports = {
	mongoose
};
