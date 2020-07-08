const express = require("express")
const router = express.Router()

router.post("/walk", function(req, res) {
    db.insert("jelmer", "1")
})

router.post("/buy",function (req, res) {

})


module.exports = router