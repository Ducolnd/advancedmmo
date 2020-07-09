const express = require('express');
const exphbs = require('express-handlebars');
var session = require('express-session')
const app = express();

app.use(session({ // Define session, this is used in every route. This MUST be placed before creating the routes (below) for it to work.
    secret: "yayee",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

const actions = require("./routes/actions");
const auth = require("./routes/auth")
const game = require("./routes/game")

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use("/auth", auth) // Includes logging in and registering
app.use("/actions", actions) // Mainly game related actions such as adding money
app.use("/game", game) // Game pages

app.use("/public", express.static(__dirname + '/public')) // Static files such as images and css

const server = app.listen(7000, () => {
    console.log("Express is up and running! Port: " + server.address().port);
});

app.get("/", function(req, res) {
    req.session.views++;
    res.render('landing', {"title": "H"})
})

app.get("/about", function(req, res) {
    req.session.views++;
    console.log(req.session)
    res.render("about", {"layout": false, username: req.session.username})
})