const db = require("../db")
const inv = require("./inventory")

const game_items = require("./items")

class Player {
    constructor(username) {
        this.inventory = new inv(username)
        console.log(this.inventory.inventory)
        db.getPlayerInventory(username, (inventory_data) => {
            this.inventory.retrieve(inventory_data)
        })

        db.getPlayerInfo(username, "*", (results) => { // Exp, coins, level and such data
            this.info = results[0]
        })
    }

    give(itemId, onSlot) {
        this.inventory.replace(itemId, onSlot)
    }
}

let Ear = new Player("EarlessBear")

setTimeout(function () {
    Ear.give(game_items[1], 1)
    console.log(Ear.inventory.inv[0].item.item)
}, 1000)
