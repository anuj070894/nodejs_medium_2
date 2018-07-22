const {MongoClient, ObjectID} = require('mongodb'); // MongoClient lets you connect to a mongo server and lets you make request to the server

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
	if (err) {
		return console.log('Error in connecting to the database ', err);
	}
	const db = client.db('TodoApp');
	db.collection('Todos').findOneAndUpdate({
		text: "Sample Todo2"
	}, {
		$set: {
			text: "Sample Todo3"
		}
	}, {
		returnOriginal: false
	}, (err, result) => {
		if (err) {
			return console.log('Error updating the record ', err);
		}
		console.log(JSON.stringify(result, undefined, 2));
	});

	client.close();
});
