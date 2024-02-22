
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
                                .findOne({_id: userId});

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

const updateUser = async(req, res) => {
    const userId = new ObjectId(req.params.id);
    const contact = {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    };
    const response = await mongo.getDb()
                                .db()
                                .collection('users')
                                .updateOne({ _id: userId}, {$set: contact});
    
    console.log(response);

    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the user\'s information.');
    }
};

const deleteUser = async(req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongo.getDb()
                                .db()
                                .collection('users')
                                .deleteOne({ _id: userId});

    console.log(response);

    if (response.deleteCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }
}

module.exports = {

    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser

}

