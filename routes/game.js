const express = require("express")
const session = require("express-session")
const router = express.Router()

router.use(session({
    secret: "yayee",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

router.get("/", function(req, res) {
    console.log(req.session.views)
    res.send("game")
})

router.get("/info",function (req, res) {
    console.log(req.session)
    res.send("info")
})

router.get("/coins",function (req, res) {
    if (req.session.loggedin) {//check if player is logged in
        res.render("coin_getter", {"layout": false, username: req.session.username})
    }
    else{//if not logged in send error
        res.render("coin_getter", {"layout": false, username: req.session.username})
        //res.send("Please log in.")
    }
})

module.exports = router