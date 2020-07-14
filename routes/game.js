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

router.use(function(req, res, next) {
    console.log("hey")

    next()
})

router.get("/", function(req, res) {
    if (req.session.loggedin){
        db.getPlayerInfo(req.session.username,"", function(data){
            //function
            res.render("game/game_home", {layout: "main-game", title: "Advanced MMO", xp: data[0].experience, coins: data[0].coins})
        })}


    else{
        res.redirect("/auth/login")
    }

    
})

router.get("/items", function (req, res) { // Get all the items in the game
    res.render("game/items", {layout: "complete"})
})

router.get("/player/:username", function (req, res) { // Get player info
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