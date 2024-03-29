const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
let passport = require('passport');
let crypto = require('crypto');
let routes = require('./routes');
const connection = require('./config/database');

// Package documentation https://www.npmjs.com/package/connect mongo
const MongoStore = require('connect-mongo')(session);

// Gives us access to variables set in the .env file via 'process.env.VARIABLE_NAME'
require('dotenv').config();

// Create the Express application
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'sessions' });

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

// Pasport AUTHENTICATION
// Need to require the entire Passport config module so app.js knows about it
require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
});

// Imports all of the routes from ./routes/index.js
app.use(routes);

// Server listen on http://localhost:3000
app.listen(3000);