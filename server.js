const express = require('express');
const session = require("express-session")
const exphbs = require('express-handlebars');
const cookieParser = require("cookie-parser")
const app = express();

const actions = require("./routes/actions");
const auth = require("./routes/auth")
const game = require("./routes/game")

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use("/auth", auth) // Includes logging in and registering
app.use("/actions", actions) // Mainly game related stuff
app.use("/game", game)

app.use(cookieParser())
app.use("/public", express.static(__dirname + '/public')) // Static files such as images and css
app.use(session({
    secret: "geheim",
    secure: false
}))

const server = app.listen(7000, () => {
    console.log("Express is up and running! Port: " + server.address().port);
});

app.get("/", function(req, res) {
    console.log(req.session)
    if(!req.session.test) {
        req.session.test = "cheese"
    } else {
        req.session.test = null
    }
    res.render('landing', {"name": req.session.test, "title": "H"})
})

app.get("/about", function(req, res) {
    res.render("about", {"layout": false})
})