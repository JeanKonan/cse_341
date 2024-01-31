const express = require('express');
const myEnv = require('dotenv').config();
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const app = express();
const port = process.env.PORT || 3000;

app.use('/', require('./routes'))

async function run() {
  try {

    const database = client.db('cse341_db');
    const myDB = database.collection('contacts');

    console.log(myDB);
    
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})
