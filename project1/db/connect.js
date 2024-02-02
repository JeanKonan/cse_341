const myEnv = require('dotenv').config();
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let _db;

const initDb = (callback) => {
    if (_db) {
        console.log("Connection already done!");
    }
    MongoClient.connect(uri)
        .then((client) => {
          _db = client;
          callback(null, _db);
          console.log('Connected successfully to the database');
        })
        .catch((err) => {
          callback(err);
          console.error('Failed to connect to the database', err);
        });
};

const getDb = () => {
    if (! _db) {
        console.log('Database not yet initialized');
    }

    return _db;
}

module.exports = {
    initDb,
    getDb
}
