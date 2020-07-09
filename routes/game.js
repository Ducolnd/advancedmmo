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

module.exports = router