// B''H //


// -- ----------------------------------------------------------------------------
import express from 'express';
import compression from 'compression';
import cors from 'cors';

// body-parser extracts the entire body portion of an incoming request stream and
// exposes it on req.body as something easier to interface with.
import bodyParser from 'body-parser';

import sql from 'mssql';

import authorRoutes from './routes/authorRoutes';
import bookRoutes from './routes/bookRoutes';
import courseRoutes from './routes/courseRoutes';

import dotenv from 'dotenv';
// -- ----------------------------------------------------------------------------


// -- ----------------------------------------------------------------------------
// https://github.com/motdotla/dotenv/blob/master/README.md
dotenv.config();
// -- ----------------------------------------------------------------------------


// -- ----------------------------------------------------------------------------
/* eslint-disable no-console */
const app = express();
app.use(compression());
app.use(cors());
app.set('port', (process.env.PORT || 8000));
// -- ----------------------------------------------------------------------------


// -- ----------------------------------------------------------------------------
const sqlConfig = {
    user    : process.env.DB_USER,
    password: process.env.DB_PASS,
    server  : process.env.DB_SERVER,
    database: 'Books',

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
};

sql.connect(sqlConfig, function (err) {
    console.log(err);
});
// -- ----------------------------------------------------------------------------


// -- ----------------------------------------------------------------------------
// Configure body-parser to be linked with Express.
// See: https://stackoverflow.com/questions/39870867/what-does-app-usebodyparser-json-do
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// -- ----------------------------------------------------------------------------


// -- ----------------------------------------------------------------------------
const authorRouter = authorRoutes(sql);
const bookRouter = bookRoutes(sql);
const courseRouter = courseRoutes(sql);
// -- ----------------------------------------------------------------------------


// -- ----------------------------------------------------------------------------
app.use('/api/authors', authorRouter);
app.use('/api/books', bookRouter);
app.use('/api/courses', courseRouter);
// -- ----------------------------------------------------------------------------


// -- ----------------------------------------------------------------------------
app.get('/', function (req, res) {
    res.send('Hello World Ya Mon!');
});

app.listen(app.get('port'), function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('App is running on ' + app.get('port'));
    }
});
// -- ----------------------------------------------------------------------------

