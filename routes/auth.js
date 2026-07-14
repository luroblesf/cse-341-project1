const router = require('express').Router();
const passport = require('../config/passport');


// #swagger.tags = ['Authentication']
// #swagger.summary = 'Login with Google OAuth'
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);


// #swagger.tags = ['Authentication']
// #swagger.summary = 'Google OAuth callback'
router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {
        res.send('Login successful');
    }
);


// #swagger.tags = ['Authentication']
// #swagger.summary = 'Logout current user'
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});


module.exports = router;