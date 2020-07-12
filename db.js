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

    newUser(username, email, password, callback) { // Create a new user
        this.insert("users", {
            username: username,
            email: email,
            password: password
        }, (err) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    console.log("duplicate first")
                    return callback(err)
                }
                console.log(err)
            } else {
                this.insert("player_data", {username: username}, function (g) {
                    if (!g) {
                        callback(false)
                    } else {
                        console.log(g)
                        callback(g)
                    }
                })
            }
        })
    }

    getPlayerInfo(username, info="*", callback) { // Default is all (*)
        db.read("player_data", {
            integers: false,
            ...(info === "*") && {columns: info},
            conditions: {
                username: username
            }
        }, function (data) {
            callback(data)
        })
    }

    insert(table, data, callback) { // New row according to 'data' object
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
            callback(err)
        })
    }

    update(table, data, condition) {
        let sql = `UPDATE ${table} SET `

        Object.keys(data).forEach(key => {
            sql += `${key} = ${data[key]},`
        })

        sql = sql.slice(0, -1) + ` WHERE ${condition}`
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

        this.db.query(sql, function (err, results) {
            if (err) console.log(err)
            callback(results)
        })
    }
}


let db = new Db()

//db.insert("users", {username: "Isd", email: "sdf", password: "testset"})
module.exports = db

