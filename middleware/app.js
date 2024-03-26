const express = require('express');

const app = express();

//
function middleware1 (req, res, next) {
    req.customProperty = 100;
    next();
}

function middleware2 (req, res, next) {
    console.log(`The custom property value is: ${req.customProperty}`);
    req.customProperty = 600;
    next();
}

function errorHandler (err, req, res, next) {
    res.json({ err: err });
}

app.use(middleware1);
app.use(middleware2);
app.use(errorHandler);

app.get('/',middleware3, (req, res, next) => {
    console.log('I am the standard Express function');
    res.send(`<h1>Hello World</h1>`);
});

app.listen(3000);