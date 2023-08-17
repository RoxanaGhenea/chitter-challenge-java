import { MongoClient } from 'mongodb';

const mongoClient = new MongoClient('mongodb+srv://roxy:QcfcJoTwRSqWf8ZD@chitter.myy1onp.mongodb.net/?retryWrites=true&w=majority');

const data = await mongoClient.db().collection("Peeps").find({}).toArray();

console.log(data);

