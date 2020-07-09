var mysql = require('mysql');

class Db {
    constructor(host="localhost", user="root", psw="abcdefgh", db_name="advanced_mmo") {
        this.db = mysql.createConnection({ // Create db object
            host: host,
            user: user,
            password: psw,
            database: db_name
        })

        this.db.connect(function (err) { // Connect database upon initalizing
            if (err) {console.log("Error! " + err)} else { console.log("Connected to database") }
        })

        this.db.on("error", function (err) { // Error
            console.log("Mysql Error!: " + err)
        })
    }

    newUser(username, email, password) { // Create a new user
        if ((get === this.insert("users", {
            username: username,
            email: email,
            password: password
        }))) { return get }

    }

    insert(table, data) { // New row according to 'data' object
        let sql = `INSERT INTO ${table} (`;

        Object.keys(data).forEach(key => {
            sql += key + ","
        })
        sql = sql.slice(0, -1) + ") VALUES (";

        Object.values(data).forEach(value => {
            sql += `'${value}',`;
        })
        sql = sql.slice(0, -1) + ")";

        this.db.query(sql, function (err) { // Perform sql query
            if (err) console.log(err)
        })
    }

    update(table, data, condition) {
        let sql = `UPDATE ${table} SET `

        Object.keys(data).forEach(key => {
            sql += `${key} = ${data[key]},`
        })

        sql = sql.slice(0, -1) + ` WHERE ${condition}`
        console.log(sql)
        this.db.query(sql, function (err) { // Perform sql query
            if (err) console.log("Mysql Error!: " + err)
        })
    }

    read(table, data, callback) { // data: {columns : [columns], conditions : {columns: value}, operators: [=, >]}, limit: int}
        let sql = `SELECT `

        if ("columns" in data) {
            data["columns"].forEach( function (name) {
                sql += `${name},`
            })
            sql = sql.slice(0, -1) + ` FROM ${table} WHERE ` // Slice last comma
        } else { sql += `* FROM ${table} WHERE `}

        let cond = data["conditions"]
        Object.keys(data["conditions"]).forEach(key => {
            if (data["integers"]) {
                if("operators" in data) {
                    sql += `${key} ${data["operators"][Object.keys(cond).indexOf(key)]} ${cond[key]} AND `
                } else {
                    sql += `${key} = ${cond[key]} AND `
                }
            } else {
                if("operators" in data) {
                    sql += `${key} ${data["operators"][Object.keys(cond).indexOf(key)]} '${cond[key]}' AND `
                } else {
                    sql += `${key} = '${cond[key]}' AND `
                }
            }
        })
        sql = sql.slice(0, -4)
        console.log(sql)

        this.db.query(sql, function (err, results) {
            if (err) console.log(err)
            callback(results)
        })
    }
}


let db = new Db()
db.read("player_data", {
    integers: false,
    columns: ["coins"],
    conditions: {
        username: "ducobear"
    }
}, function (data) {
    console.log(data[0].coins)
})
db.read("player_data", {
    integers: false,
    //columns: ["username", "email", "password"],
    conditions: {
        coins: 5000,
        //email: "duco.lindhout@gmail.com"
    },
    operators: [
        ">",
    ]
}, function (returnValue) {
    console.log(returnValue[0]["username"])
})
//db.insert("users", {username: "Isd", email: "sdf", password: "testset"})

module.exports = db

