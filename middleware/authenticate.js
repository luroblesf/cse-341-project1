const isAuthenticated = (req, res, next) => {

    console.log("PASÓ POR AUTHENTICATE");
    console.log("Usuario:", req.session.user);

    if (!req.session.user) {
        return res.status(401).json('You do not have access.');
    }
    next();
};

module.exports = {
    isAuthenticated
};