const express = require('express');
const router = express.Router();
router.use('/', require('./swagger'));
router.get('/', (req, res) => {
    res.send('| Welcome to CSE 341 Project 1 |');
});

router.use('/users', require('./users'));
router.use('/groups', require('./groups'));
router.use('/auth', require('./auth'));

module.exports = router;