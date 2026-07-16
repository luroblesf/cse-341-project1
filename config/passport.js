const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const usersCollection = mongodb
                    .getDb()
                    .collection('users');


                let user = await usersCollection.findOne({
                    googleId: profile.id
                });

                if (!user) {
                    const newUser = {
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        createdAt: new Date()
                    };

                    const result = await usersCollection.insertOne(newUser);

                    user = {
                        _id: result.insertedId,
                        ...newUser
                    };
                }

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user._id.toString());
});


passport.deserializeUser(async (id, done) => {
    try {
        const user = await mongodb
            .getDb()
            .collection('users')
            .findOne({
                _id: new ObjectId(id)
            });

        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;