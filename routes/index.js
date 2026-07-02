const express = require('express');

router.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = router;