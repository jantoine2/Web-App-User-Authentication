const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const { validPassword } = require('../lib/passwordUtils');
const User = connection.models.User;

const customFields = {
    usernameField: 'uname',
    passwordField: 'pw'
};

const verifyCallback =  (username, password, done) => {

    User.findOne({ username: username})
            .then((user) => {

                if (!user) { return done(null, false)}

                // Function defined at bottom of app.js
                const isValid = validPassword(password, user.hash, user.salt);

                if (isValid) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch((err) => {
                done(err);
            });
}

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);


