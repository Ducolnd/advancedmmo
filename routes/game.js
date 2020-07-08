const express = require("express")
const session = require('express-session');
const router = express.Router()

router.use(session({
    secret: "geheim",
}))

router.get("/", function(req, res) {
    if (req.session.loggedin) {
        res.render("game/gamehome", {"name": req.session.username})
    } else {
        res.send("Not logged in")
    }
})

router.get("/info",function (req, res) {

})


module.exports = router