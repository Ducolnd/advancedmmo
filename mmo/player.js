const db = require("../db")
const inv = require("./inventory")

const game_items = require("./items")

class Player {
    constructor(username) {
        this.inventory = new inv(username)
        db.getPlayerInventory(username, (inventory_data) => {
            //this.inventory.retrieve(inventory_data)
        })

        db.getPlayerInfo(username, "*", (results) => { // Exp, coins, level and such data
            this.info = results[0]
        })
    }

    give(item, onSlot) {
        this.inventory.add(item, onSlot)
    }
}

let Ear = new Player("EarlessBear")

setTimeout(function () {
    Ear.give({item: game_items[1], item_specific: {}}, 1)
    console.log()
}, 1000)
