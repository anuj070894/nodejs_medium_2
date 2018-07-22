const {MongoClient, ObjectID} = require('mongodb'); // MongoClient lets you connect to a mongo server and lets you make request to the server

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
	if (err) {
		return console.log('Error in connecting to the database ', err);
	}
	const db = client.db('TodoApp');
	db.collection('Todos')
		.find()
		// .find({completed: true}) // returns a cursor/pointer
		// .find({_id: new ObjectID("5b54938ccc416d730d62a013")}) // returns a cursor/pointer
		.toArray((err, items) => {
			if (err) {
				return console.log('Error in finding from the database ', err);
			}
			console.log(JSON.stringify(items, undefined, 2)); // [{}, {}] .. collection of documents in an array
		});

	client.close();
});
