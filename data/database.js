const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let Db;
let client;

const initDb = async (callback) => {
    try {
        if (Db) {
            console.log('DB is already initialized!');
            return callback(null, Db);
        }

        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        client = new MongoClient(process.env.MONGODB_URI);

        await client.connect();

        Db = client.db('project1');

        console.log('MongoDB connected successfully');

        callback(null, Db);

    } catch (err) {
        console.error('MongoDB connection error:', err);
        callback(err);
    }
};

const getDb = () => {
    if (!Db) {
        throw new Error('Db not initialized!');
    }
    return Db;
};

module.exports = {
    initDb,
    getDb,
};