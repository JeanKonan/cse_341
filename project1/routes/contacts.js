const express = require('express');
const router = express.Router();
const mongo = require('../db/connect');

router.get('/', async function(req, res, next) {
    try {
        const client = mongo.getDb()
        const collection = client.db().collection("contacts");
        const contacts = await collection.find().toArray();
        res.json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/:id', async function(req, res, next) {
    try {
        const client = mongo.getDb();
        const collection = client.db().collection("contacts");
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
