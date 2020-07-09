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
}

let db = new Db()
//db.insert("users", {username: "Isd", email: "sdf", password: "testset"})

module.exports = db

