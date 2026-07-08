const express = require('express');
const router = express.Router();
router.use('/swagger', require('./swagger'));
router.get('/', (req, res) => {
    res.send('| Welcome to CSE 341 Project 1 |');
});

router.use('/users', require('./users'));

module.exports = router;