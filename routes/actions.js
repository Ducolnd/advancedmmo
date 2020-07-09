const express = require("express")
const session = require("express-session")
const router = express.Router()

router.use(session({
    secret: "yayee",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))


router.post("/walk", function(req, res) {
    res.end()
})

router.post("/buy",function (req, res) {

})

router.post("/money",function (req, res) {
    
    res.json({wait: 0})
})

module.exports = router