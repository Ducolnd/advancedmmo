const db = require("../db")
const inv = require("./inventory")

const game_items = require("../items.json")

class Player {
    constructor(username) {
        this.inventory = new inv(username)
        this.username = username
        this.playerColor = "red"

        db.getPlayerInventory(username, (inventory_data) => {
            this.inventory.retrieve(inventory_data)
        })

        db.getPlayerInfo(username, "*", (results) => { // Exp, coins, level and such data
            this.info = results[0]
        })
    }

    sell(onSlot) {

    }

    give(item, onSlot=-1) { // If slot -1, first available slot will be picked
        this.inventory.add(item, onSlot)
    }

    get render() { // Function to get player data to use it when rendering. It basically puts all player info in an object
        return {stats: this.info, username: this.username, color: this.playerColor}
    }

    get getInv() { // Get player inventory in object form
        return this.inventory.inv
    }

    get getStats() {
        return this.info
    }
}

let playerCache = {EarlessBear: new Player("EarlessBear")}

function addCache(player) {
    console.log(player)
    if (!playerCache[player]) {
        playerCache[player] = new Player(player)
    }
    console.log(playerCache["a"])
}

setTimeout(function () {
    playerCache["EarlessBear"].give({item: game_items["1"], item_specific: {}}, 49)
}, 1000)

module.exports = {
    playerCache,
    addCache,
}
