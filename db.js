var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "abcdefgh",
    database: "advanced_mmo"
});

con.connect(function(err) { // Create and check connection
    if (err) {
        console.log("Error" + err)
        return
    } console.log("Connected!");
});

con.on("error", function(err) {
    console.log("[mysql error]", err)
})

function newUser(username, email, password) {
    var sql = `INSERT INTO users (username, email, password) VALUES ("${username}", "${email}", "${password}")`
    con.query(sql)

    console.log("Created new user!")
}

module.exports = con

