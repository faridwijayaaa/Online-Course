const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');

const app = express();

const db = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : 'Polopo.90',
    database    : 'online_course'
});

app.use(session({ 
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}))

const cssDirectory = path.join(__dirname, './css');
app.use(express.static(cssDirectory));

const imagesDirectory = path.join(__dirname, './images');
app.use(express.static(imagesDirectory));
const favImgDirectory = path.join(__dirname, './images/fav');
app.use(express.static(favImgDirectory));

const jsDirectory = path.join(__dirname, './js');
app.use(express.static(jsDirectory));

//parse url-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false}));
//parse json
app.use(express.json());

app.set('view engine', 'hbs');

db.connect( (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("MYSQL connected..");
    }
})

//Define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'))

app.listen(5002, () => {
    console.log("this using 5002 port");
});