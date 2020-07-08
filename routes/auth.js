const express = require("express")
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('../db');

const router = express.Router()

router.use(session({
    secret: "geheim",
    resave: true,
    saveUninitialized: true
}))
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

router.get("/register", function(req, res) {
    res.render("register", {"layout": false} );
});

router.post("/register/data", function (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {
        db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], function (error, results, field) {
            if(results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect("/");
            } else {
                res.send("Incorrect username or password");
            }
            res.end();
        });
    } else {
        res.send("Enter username AND password");
        res.end();
    }

});

module.exports = router