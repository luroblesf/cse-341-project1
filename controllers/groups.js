const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb
            .getDb()
            .collection('groups')
            .find();

        const groups = await result.toArray();

        return res.status(200).json(groups);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid group ID.'
            });
        }

        const groupId = new ObjectId(req.params.id);

        const result = await mongodb
            .getDb()
            .collection('groups')
            .find({ _id: groupId });

        const groups = await result.toArray();

        if (!groups.length) {
            return res.status(404).json({
                message: 'Group not found.'
            });
        }

        return res.status(200).json(groups[0]);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const createGroup = async (req, res) => {
    const group = {
        name: req.body.name,
        description: req.body.description,
        meetingPlace: req.body.meetingPlace,
        createdAt: new Date(),
        isActive: req.body.isActive
    };

    try {
        const response = await mongodb
            .getDb()
            .collection('groups')
            .insertOne(group);

        if (response.acknowledged) {
            return res.status(201).json({
                message: 'Group created successfully',
                id: response.insertedId
            });
        }

        return res.status(500).json({
            message: response.error || 'Some error occurred while creating the group.'
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const updateGroup = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid group ID.'
            });
        }

        const groupId = new ObjectId(req.params.id);

        const group = {
            name: req.body.name,
            description: req.body.description,
            meetingPlace: req.body.meetingPlace,
            createdAt: new Date(),
            isActive: req.body.isActive
        };

        const response = await mongodb
            .getDb()
            .collection('groups')
            .replaceOne({ _id: groupId }, group);

        if (response.modifiedCount > 0) {
            return res.status(204).send();
        }

        return res.status(404).json({
            message: 'Group not found.'
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const deleteGroup = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid group ID.'
            });
        }

        const groupId = new ObjectId(req.params.id);

        const response = await mongodb
            .getDb()
            .collection('groups')
            .deleteOne({ _id: groupId });

        if (response.deletedCount > 0) {
            return res.status(204).send();
        }

        return res.status(404).json({
            message: 'Group not found.'
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getAll,
    getSingle,
    createGroup,
    updateGroup,
    deleteGroup
};