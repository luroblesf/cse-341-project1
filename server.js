const express = require('express');
const mongodb = require('./data/database');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/', require('./routes'));

const startServer = async () => {
    try {
        mongodb.initDb((err) => {
            if (err) {
                console.error('MongoDB connection error:', err);
            }

            app.listen(port, () => {
                console.log(`Server running on port ${port}`);
            });
        });

    } catch (error) {
        console.error('Fatal server error:', error);
    }
};

startServer();