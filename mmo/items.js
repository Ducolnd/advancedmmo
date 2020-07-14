class Item {
    constructor(item_data, item) {
        this.item_data = item_data
    }

}

// Item types

class Food {
    constructor(item_data) {
    }
}

class Armour {
    constructor(item_data) {
        this.item_data = item_data
    }
}

class Weapon {
    constructor(item_data = {stack_size: 1}) {
    }
}

const game_items = {
    1: new Item({
        id: 1,
        item_name: "Oathbreaker",
        description: "Oathbreaker, a sword of Valyrian steel.",
        icon: "oathbreaker.png", // Bestand van foto,
        item_sell_price: 100, // NPC sell price
        item_buy_price: 150,
    }, new Weapon({
        sub_type: "sword", // Example: sword, axe, bow, sling, gun
        attack_parameters: {
            default_damage: 200,
            critical_amplifier: 1.15,
        },
    })),

    2: new Item("Diamond Hitch", new Armour({
        id: 1,
    })),
}

module.exports = game_items