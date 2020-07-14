const game_items = require("../items.json")
const db = require("../db")

class Inventory {
    constructor(username) {
        this.username = username
        this.inv = {}
        this.slots = 50 // How many items there can be in the inventory
    }

    add(item, slot, qnt=1) {
        if (slot > this.slots || this.inv[slot]) { // Have limited slots and slot already occupied
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

    getInventory() {

    }

    retrieve(inventory_list) { // Read inv from db and put in inventory object
        inventory_list.forEach((item) => {
            let itemObj = JSON.parse(item.item)
            this.inv[item.slot] = {
                quantity: item.quantity,
                item: {item: game_items[itemObj.item_id], item_data: itemObj.item_data}
            }
        })
    }

    updateDb() { // Make sure the database is up to date with the current inventory
        for (const [slot, item] of Object.entries(this.inv)) {
            if (item.altered) {
                item.altered = false

                console.log(item.item)

                let obj = {item_id: item.item.item.id, item_data: item.item.item_specific}
                let itemJson = JSON.stringify(obj)

                console.log(itemJson, obj)

                db.db.query(`INSERT INTO player_inventory (slot, quantity, username, item) VALUES (${slot}, ${item.quantity}, '${this.username}', '${itemJson}') ON DUPLICATE KEY UPDATE quantity=${item.quantity}, item='${itemJson}'`, function (err, results) {
                    if (err) {
                        console.log(err)
                    }

                    console.log(results)
                })
            }
        }
    }
}

module.exports = Inventory