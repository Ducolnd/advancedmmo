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
        
        req.session.enemy.health -= req.session.enemy.opdamage
        req.session.enemy.ophealth -= req.session.enemy.damage
        console.log(req.session.enemy)
        res.json({
            health: req.session.enemy.health,
            ophealth: req.session.enemy.ophealth,
            stamina: req.session.enemy.stamina,
            opstamina: req.session.enemy.opstamina
        })
    }
    else{ //if not logged in send error
        res.redirect("/auth/login")
        //res.send("Please log in.")
    }
})



module.exports = router