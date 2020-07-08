const express = require("express")
const session = require('express-session');
const cookieParser = require("cookie-parser")
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');
const db = require('../db');

const router = express.Router()

router.use(cookieParser())
router.use(session({
    secret: "geheim",
}))

router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

router.get("/login", function(req, res) {
    if (req.session.loggedin) {
        res.redirect("/")
    }
    res.render("login", {"layout": false} );
});

router.get("/register", function (req, res) {
    res.render("register", {"layout": false})
})

// Register router
router.post("/register/data", async function (req, res) {
    let username = req.body.username;
    let email =  req.body.email;
    try { // Hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 8)

        db.query("SELECT * FROM users WHERE username = ? AND email = ?", [username, email], function (error, results) {
            if (!results.length > 0) {
                db.query(`INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${hashedPassword}')`, function (err, result) {
                    if (!err) {
                        req.session.loggedin = true;
                        req.session.username = username;

                        res.redirect("/")
                    }
                })
            } else {
                res.send("Username or email already exists, try again.")
            }
        })
    } catch {
        res.status(500).send()
    }
})

// Login router
router.post("/login/data", function (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) { // Check if provided
        db.query("SELECT * FROM users WHERE username = ? LIMIT 1", [username], async function (error, results, field) {
            if(results.length > 0) {
                let pwd = results[0].password;
                try {
                    if(await bcrypt.compare(password, pwd)) {
                        req.session.loggedin = true;
                        req.session.username = username;
                        res.redirect("/");
                    } else {
                        res.send("Password was incorrect")
                    }
                } catch {
                    res.status(500).send("error")
                }

            } else {
                return res.status(400).send("Incorrect username or password");
            }
            res.end();
        });
    } else {
        res.send("Enter username AND password");
        res.end();
    }

});

module.exports = router