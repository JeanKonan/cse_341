
const mongo = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try{
        const result = await mongo.getDb()
                                .db()
                                .collection('users')
                                .find()
                                .toArray();
        res.json(result);
    } catch (err){
        console.error(err);
        res.status(500)
            .json({message: 'Internal Server Error'});
    } 
}

const getSingle = async (req, res) => {
    try {

        const userId = new ObjectId(req.params.id);
        const result = await mongo.getDb()
                                .db()
                                .collection('users')
                                .findOne({_id: userId})
                                .toArray();

        if (result) {
            res.json(result)
        } else {
            res.status(404)
                .json({ message: 'User not found' });
        }

    } catch (err) {

        console.error(err);
        res.status(500)
            .json({message: 'Internal Server Error'});

    }
}

const createUser = async (req, res) => {

    const contact = {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    };

    const result = await mongo.getDb()
                            .db()
                            .collection('users')
                            .insertOne(contact);

    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500)
            .json(result.error || 'Some error occurred while creating the contact.');
    }
}

module.exports = {

    getAll,
    getSingle,
    createUser

}

