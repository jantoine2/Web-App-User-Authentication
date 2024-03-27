const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

// Package documentation - https://ww.npmjs.com/package/connect-mongo
const MongoStore = require('connect-mongo')(session);

// Create the Express application
const app = express();
// <user>:<password>@
const dbString = 'mongodb://localhost:27017/tutorial_db';
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const connection = mongoose.createConnection(dbString, dbOptions);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const sessionStore = new MongoStore({
    mongooseConnection: connection,
    collection: 'sessions'
});

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 days
    }
}));

app.get('/', (req, res, next) => {
    if (req.session.viewCount) {
        req.session.viewCount = req.session.viewCount + 1;
    } else {
        req.session.viewCount = 1;
    }
    
    res.send(`<h1>You have visited this page ${req.session.viewCount} times.</h1>`)
});
app.listen(3000);