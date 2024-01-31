const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

router.get('/', async function(req, res) {
    try {
        await client.connect();
        const collection = client.db("test").collection("contacts");
        const contacts = await collection.find().toArray();
        res.json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/:id', async function(req, res) {
    try {
        await client.connect();
        const collection = client.db("test").collection("contacts");
        const contact = await collection.findOne({ _id: ObjectId(req.params.id) });
        if (contact) {
            res.json(contact);
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
