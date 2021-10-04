const database = require('./database');
const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost/pokemon';
const client = new MongoClient(url);

async function test() {
    database.main();
}