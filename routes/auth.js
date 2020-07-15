const express = require("express")
const session = require("express-session")
const cache = require("../mmo/player")
const {body, validationResult} = require("express-validator")
const bcrypt = require("bcrypt");
const db = require("../db")
const bodyParser = require('body-parser');

const router = express.Router()

router.use(session({
    secret: "yayee",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

router.get("/login", function(req, res) {
    res.render("auth/login", {layout: "logincomplete.handlebars", title: "Login page"} );
});

router.get("/register", function (req, res) {
    res.render("auth/register", {layout: "logincomplete.handlebars", title: "Register new account", erros: req.session.errors})
})

// Register router
router.post("/register/data", [
    body("username").isAscii().withMessage("Username may only contain ASCII characters"),
    body("email").isEmail().withMessage("Email is not a valid email"),
    body("password").isAscii().isLength({min: 5, max: 50}).withMessage("Password must be at least 5 characters long and at most 50 characters")

], async function (req, res) {
    let errors = validationResult(req).array()
    if (Array.isArray(errors) && errors.length) {
        console.log(errors)
        req.session.errors = errors;
        return res.redirect("/auth/register")
    } else {
        let username = req.body.username;
        let email = req.body.email;

        try { // Hash password
            const hashedPassword = await bcrypt.hash(req.body.password, 8)

            db.newUser(username, email, hashedPassword, function (err) {
                if (!err) {
                    req.session.loggedin = true;
                    req.session.username = username;
                    cache.addCache(username)

                    res.redirect("/")
                } else {
                    console.log("mysql err!: ", err)
                    res.send("An error occurred while registering you in. This is not your fault, contact an admin")
                }
            })
        } catch (err) {
            console.log("catch error with err: ", err)
            res.send("failed")
        }
    }
})

// Login router
router.post("/login/data", function (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) { // Check if provided
        db.db.query("SELECT * FROM users WHERE username = ? LIMIT 1", [username], async function (error, results) {
            if(results.length > 0) {
                let pwd = results[0].password;
                try {
                    if(await bcrypt.compare(password, pwd)) {
                        req.session.loggedin = true;
                        req.session.username = username;

                        cache.addCache(username)

                        res.redirect("/");
                    } else {
                        res.send("Password was incorrect")
                    }
                } catch (err) {
                    res.status(500).send("error " + err)
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