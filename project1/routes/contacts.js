const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const mongo = require('../db/connect');
const { getDb } = require('../db/connect.js')

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
        const contact = await collection.findOne({ _id: new ObjectId(req.params.id) });
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

router.post('/', async function(req, res) {
    const client = mongo.getDb();
    const collection = client.db().collection('contacts');
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const response = await collection.insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
  });

router.put('/:id', async function(req, res) {
    try {
        const client = mongo.getDb();
        const collection = client.db().collection("contacts");
        const updatedContact = req.body;

        const result = await collection.updateOne(
            { _id: new ObjectId(req.params.id) }, 
            { $set: updatedContact }
        );

        if (result.modifiedCount === 1) {
            res.status(200).json({message: 'Contact updated successfully'});
        } else {
            throw new Error('Error updating contact');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

router.delete('/:id', async function (req, res) {
    try {
        const client = mongo.getDb();
        const collection = client.db().collection("contacts");

        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });

        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Contact deleted successfully' });
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;
