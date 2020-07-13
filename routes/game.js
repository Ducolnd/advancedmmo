const express = require("express")
const session = require("express-session")
const db = require("../db")
const router = express.Router()

router.use(session({
    secret: "yayee",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

router.get("/", function(req, res) {
    res.render("game/game_home", {layout: "main-game", title: "Advanced MMO"})
})

router.get("/items", function (req, res) { // Get all the items in the game
    res.render("game/items")
})

router.get("/items/add", function (req, res) { // Add a new item

})

router.get("/player/:username", function (req, res) {
    db.getPlayerInfo(req.params.username, "",function (results) {
        if (results && !results.length) {
            res.render("game/users", {layout: "complete", found: false})
        } else {
            res.render("game/users", {layout: "complete", found: true, user: results[0]})
        }
    })
})


router.get("/info",function (req, res) {
    console.log(req.session)
    res.send("info")
})

router.get("/coins",function (req, res) {
    if (req.session.loggedin) { //check if player is logged in
        res.render("game/coin_getter", {"layout": false, username: req.session.username})
    }
    else{ //if not logged in send error
        res.render("game/coin_getter", {"layout": false, username: req.session.username})
        //res.send("Please log in.")
    }
})

module.exports = router