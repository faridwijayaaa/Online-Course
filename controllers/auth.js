const mysql = require("mysql");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Polopo.90",
    database: "online_course"
});

exports.register = (req, res) => {
    console.log(req.body);

    const { name, email , password, passwordConfirm } = req.body;

    db.query('SELECT email FROM accounts WHERE email = ?', [email], (error, results) => {
        if (error) {
            console.log(error);
        }
        
        if (results.length > 0) {
            return res.render('register', {
                message: 'That email is already in use'
            })
        } else if ( password !== passwordConfirm ) {
            return res.render('register', {
                message: 'Password do not match'
            });
        }

        let hashedPW = bcrypt.hash(password);
        console.log(hashedPW);

        db.query('INSERT INTO accounts SET ?', {name: name, email: email, password: password}, (error, results) => {
            if(error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('register', {
                    message: 'User registered'
                });
            }
            
        });


    });

}