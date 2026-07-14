const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    const result = await mongodb.getDb().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};


const getSingle = async (req, res) => {
    try {

        const userId = new ObjectId(req.params.id);

        const result = await mongodb
            .getDb()
            .collection('users')
            .find({ _id: userId });

        const users = await result.toArray();

        if (!users.length) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        res.status(200).json(users[0]);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const createUser = async (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
        phone: req.body.phone,
        groupId: req.body.groupId
    };

    try {
        const response = await mongodb
            .getDb()
            .collection('users')
            .insertOne(user);

        if (response.acknowledged) {
            res.status(201).json({
                message: "User created successfully",
                id: response.insertedId
            });
        } else {
            res.status(500).json(
                response.error || 'Some error occurred while creating the user.'
            );
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);

        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday,
            phone: req.body.phone,
            groupId: req.body.groupId
        };

        const response = await mongodb
            .getDb()
            .collection('users')
            .replaceOne({ _id: userId }, user);

        if (response.modifiedCount > 0) {
            return res.status(204).send();
        }

        res.status(404).json({
            message: "User not found."
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {

        const userId = new ObjectId(req.params.id);

        const response = await mongodb
            .getDb()
            .collection('users')
            .deleteOne({ _id: userId });

        if (response.deletedCount > 0) {
            return res.status(204).send();
        }

        res.status(404).json({
            message: "User not found."
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};