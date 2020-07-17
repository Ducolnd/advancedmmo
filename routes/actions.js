const express = require("express")
const session = require("express-session")
const db = require("../db")
const router = express.Router()
const enemies = require("../enemies.json")



router.use(session({
    secret: "yayee",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

router.post("/walk", function(req, res) {
    res.json({timetowait: 23})
})

router.post("/buy",function (req, res) {

})

router.post("/money",function (req, res) {
    db.getPlayerInfo(req.session.username, (returnData) => {
        res.json(returnData[0])
    })
})

router.post("/attack/deal", function(req, res){
    if (req.session.loggedin) { //check if player is logged in
        
        if (req.session.enemy.stamina < 1){
            req.session.enemy.health -= Math.round((enemies[req.session.enemy.enemy_id]["damage"]/enemies[req.session.enemy.enemy_id]["defence"])/2)
        }
        else{
            req.session.enemy.stamina --
            req.session.enemy.health -= Math.round(enemies[req.session.enemy.enemy_id]["damage"]/enemies[req.session.enemy.enemy_id]["defence"])
        }

        if (req.session.enemy.opstamina < 1){
            req.session.enemy.ophealth -= Math.round((req.session.enemy.damage/req.session.enemy.def)/2)
        }
        else{
            req.session.enemy.opstamina --
            req.session.enemy.ophealth -= Math.round(req.session.enemy.damage/req.session.enemy.def)
        }
        
        if (req.session.enemy.ophealth <= 0) {
            res.send("win")
        } else if (req.session.enemy.health <= 0) {
            res.send("lose")
        } else {
            res.json({
                health: req.session.enemy.health,
                ophealth: req.session.enemy.ophealth,
                stamina: req.session.enemy.stamina,
                opstamina: req.session.enemy.opstamina
        })}
    }
    else{
        res.redirect("/auth/login")
    }
})



module.exports = router