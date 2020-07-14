class Item {
    constructor(item = {stack_size: 100}) {
        this.item = item
    }
}

//All data an item should have:
// - id(INT) the same number as the place in the itemlist
// - name(string)
// - description(string)
// - icon(.png file) All icons should be 32 by 32 pixel art drawings
// - sell_price(INT) the NPC sell price
// - buy_price(INT) the NPC buy price
// - stack_size(INT) default = 100
// - rarity(INT) trash0, common1, uncommon2, rare3, magical4, mythic5
// - item_data(Object) put an object here to give the type-specific values


// Item types

class Food {
    constructor(item_data) {
    }
}

class Armour {//all armour pieces are a set: Helmet, Shirt, Pants, gloves, shoes
    constructor(item_data) {
        this.item_data = item_data
    }
}
//All data an Armourpiece should have:
// - type(string) The type of armour: Helmet, Shirt, Pants, gloves, shoes
// - defence(INT) The amount of defence an armourpiece gives
// - setname(string) The name of the set

class Weapon {
    constructor(item_data = {stack_size: 1}) {
    }
}

new Weapon()

const game_items = {
    1: {
        id: 1,
        name: "Chainmail shoes",
        description: "Strong boots made at the hand of a blacksmith",
        icon: "chainmail-shoes.png",
        sell_price: 100,
        buy_price: 150,
        stack_size: 1,
        rarity: 1,
        item_data: {
            type: "shoes",
            defence: 2,
            set_name: "chainmail"
        }
    },
    2: new Item({
        id: 2,
        name: "Chainmail gloves",
        description: "Strong gloves made at the hand of a blacksmith",
        icon: "../images/Icons/chainmail-gloves",
        sell_price: 100,
        buy_price: 150,
        stack_size: 1,
        rarity: 1,
        item_data: new Armour({
            type: "shoes",
            defence: 2,
            set_name: "chainmail"
        })
    }),
    3: new Item({
        id: 3,
        name: "Chainmail pants",
        description: "Strong pants made at the hand of a blacksmith",
        icon: "../images/Icons/chainmail-pants",
        sell_price: 100,
        buy_price: 150,
        stack_size: 1,
        rarity: 1,
        item_data: new Armour({
            type: "pants",
            defence: 2,
            set_name: "chainmail"
        })
    }),
    4: new Item({
        id: 4,
        name: "Chainmail shirt",
        description: "Strong shirt made at the hand of a blacksmith",
        icon: "../images/Icons/chainmail-shirt",
        sell_price: 100,
        buy_price: 150,
        stack_size: 1,
        rarity: 1,
        item_data: new Armour({
            type: "shirt",
            defence: 2,
            set_name: "chainmail"
        })
    }),
    5: new Item({
        id: 5,
        name: "Chainmail helmet",
        description: "Strong helmet made at the hand of a blacksmith",
        icon: "../images/Icons/chainmail-helmet",
        sell_price: 100,
        buy_price: 150,
        stack_size: 1,
        rarity: 1,
        item_data: new Armour({
            type: "helmet",
            defence: 2,
            set_name: "chainmail"
        })
    })
}
console.log("alksdjf")
console.log(game_items[1].item)

module.exports = game_items