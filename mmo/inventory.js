const game_items = require("./items")
const db = require("../db")

class Inventory {
    constructor(username) {
        this.username = username
        this.inv = {}
        this.slots = 50 // How many items there can be in the inventory
    }

    add(item, slot, qnt=1) {
        if (slot > this.slots || this.inv[slot]) { // Have limited slots and slot already occupied
            console.log("Not e nough slots")
            return "Not enough slots or slot is already occupied"
        }

        this.inv[slot] = {item: item, quantity: qnt, altered: true}

        this.updateDb()
    }

    replace(item, slot, qnt=1) {
        if(!this.inv[slot]) {
            console.log("No item equpped")
            return "No item equipped on that slot"
        }

        this.inv[slot] = {item: item, quantity: qnt, altered: true}

        this.updateDb()
    }

    retrieve(inventory_list) {
        inventory_list.forEach((item) => {
            this.inv[item.slot] = {
                item: game_items[item.item_id],
                quantity: item.quantity,
            }
        })
    }

    updateDb() { // Make sure the database is up to date with the current inventory
        for (const [slot, item] of Object.entries(this.inv)) {
            if (item.altered) {
                console.log(item.item.item_data)
                db.db.query(`INSERT INTO player_inventory (slot, quantity, username, item_id, item_data) VALUES (${slot}, ${item.quantity}, '${this.username}', ${item.item.item_data.id}, '{}') ON DUPLICATE KEY UPDATE slot=${slot}, quantity=${item.quantity}, item_id=${item.item.item_data.id}`, function (err, results) {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        }
    }
}

module.exports = Inventory