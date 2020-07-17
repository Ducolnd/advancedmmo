const express = require("express")
const session = require("express-session")
const db = require("../db")
const router = express.Router()
const game_items = require("../items.json")
let playerCache = require("../mmo/player")

const enemies = require("../enemies.json")


function randint(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

router.use(session({
    secret: "yayee",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

router.use(function(req, res, next) {

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

router.get("/attack", function(req, res){// The page to attack something
    if (req.session.loggedin){
        db.getPlayerInfo(req.session.username,"", function(data){
            //function
            enemy = enemies[randint(1, 3)]
            req.session.enemy = {
                enemy_id: enemy["id"],
                opname: enemy["name"],
                ophealth: enemy['health'],
                opstamina: enemy["stamina"],
                opdef: enemy["defence"],
                damage: 10,
                def: 5,
                health: 100,
                stamina: 10
                }

            res.render("game/attack", {
                layout: "main-game", 
                title: "Advanced MMO", 
                xp: data[0].experience, 
                coins: data[0].coins, 
                oponent: req.session.enemy.opname,
                opstamina: req.session.enemy.opstamina,
                ophealth: req.session.enemy.ophealth,
                health: req.session.enemy.health,
                stamina: req.session.enemy.stamina
            })
        })}
    else{
        res.redirect("/auth/login")
    }
})
router.get("/win", function(req, res){
    res.send("win")
})
router.get("/lose", function(req, res){
    res.send("lose")
})

module.exports = router