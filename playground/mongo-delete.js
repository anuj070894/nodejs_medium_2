const {MongoClient, ObjectID} = require('mongodb'); // MongoClient lets you connect to a mongo server and lets you make request to the server

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
	if (err) {
		return console.log('Error in connecting to the database ', err);
	}
	const db = client.db('TodoApp');
	db.collection('Todos')
	.deleteMany({
		text: "Sample Todo2"
	// .findOneAndDelete({
	// 	text: "Sample Todo2"
	// .deleteOne({
	// 	text: "Sample Todo2"
	}, (err, result) => {
		if (err) {
			return console.log('Error in inserting to the database ', err);
		}
		console.log(JSON.stringify(result, undefined, 2));
	});

	client.close();
});
