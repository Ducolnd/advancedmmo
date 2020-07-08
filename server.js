const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

const actions = require("./routes/actions");
const auth = require("./routes/auth")

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use("/", auth)
app.use("/actions", actions)
app.use("/public", express.static(__dirname + '/public'))

const server = app.listen(7000, () => {
    console.log("Express is up and running! Port: " + server.address().port);
});

app.get("/", function(req, res) {
    res.render('landing', {"name": "Ducos", "title": "H"})
})

app.get("/about", function(req, res) {
    res.render("about", {"layout": false})
})