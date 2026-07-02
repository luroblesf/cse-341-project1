const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let database;
let client;

const initDb = async (callback) => {
    try {
        if (database) {
            console.log('DB is already initialized!');
            return callback(null, database);
        }

        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        client = new MongoClient(process.env.MONGODB_URI);

        await client.connect();

        database = client.db('project1');

        console.log('MongoDB connected successfully');

        callback(null, database);

    } catch (err) {
        console.error('MongoDB connection error:', err);
        callback(err);
    }
};

const getDb = () => {
    if (!database) {
        throw new Error('Database not initialized!');
    }
    return database;
};

module.exports = {
    initDb,
    getDb,
};