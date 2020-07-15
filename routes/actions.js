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

router.post("/attack", function(req, res){
    
})



module.exports = router