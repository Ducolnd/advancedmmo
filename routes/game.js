const express = require("express")
const session = require("express-session")
const db = require("../db")
const router = express.Router()

const game_items = require("../items.json")
let playerCache = require("../mmo/player")

router.use(session({
    secret: "yayee",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

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

router.get("/items/:page*?", function (req, res) { // Get all the items in the game
    let page
    page = (!req.params.page) ? 0 : parseInt(req.params.page)
    let perPage = 20
    let toShow = {}

    for (let i = page * 10; i < page * 10 + perPage; i++) {
        if(!game_items[i.toString()]) continue
        toShow[i] = game_items[i.toString()]
    }

    res.render("game/items", {layout: "complete", items: toShow})
})

router.get("/player/:username", function (req, res) { // Get player info
    let inv = playerCache["EarlessBear"].getInv

    res.render("game/users", {layout: "complete", found: true,
        userStats: playerCache["EarlessBear"].getStats,
        inventory: inv
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