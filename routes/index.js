const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.send(
        req.session.user
            ? `Logged in as ${req.session.user.username}`
            : 'Logged Out'
    );
});

router.use('/users', require('./users'));
router.use('/groups', require('./groups'));

module.exports = router;