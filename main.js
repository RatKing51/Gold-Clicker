var game = {
    gold: 0,
    gps: 0,
    clicked: 0,
    clickValue: 1,
    totalGold: 0,

    click: function(amount) {
        this.gold += amount;
        this.clicked++;
        this.totalGold += amount;
        display.updateScore()
        this.perk.spawn()
    },

    upgrade:  {
        name: [
            "Cursor",
            "Shovel",
            "Mine Cart",
            "Mountain",
            "Safe",
            "Bank",
            "Bunker",
            "Rocket",
            "Moon",
            "Moon Base",
            "Moon Lab"
        ],

        cost: [
            30,
            100,
            1000,
            2000,
            5000,
            12000,
            20000,
            50000,
            1500000,
            3000000,
            10000000
        ],

        amount: [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ],

        owned: [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false
        ],
        
        income: [
            0.5,
            1,
            3,
            10,
            19,
            25,
            42,
            63,
            91,
            135,
            225
        ],

        image: [
            "cursor.webp",
            "shovel.png",
            "mining_cart.jpg",
            "mountain.jpg",
            "safe.png",
            "bank.png",
            "bunker.jpg",
            "rocket.png",
            "moon.png",
            "moon-base.png",
            "lab.jpg"
        ],

        description: [
            "Will Click for you, Produces: ",
            "Shovel to get more gold, Produces: ",
            "Mine Cart to get your empire growing, Produces: ",
            "Mountain for your Mine Cart, Produces: ",
            "You need a safe for all that gold, Produces: ",
            "You got all of this gold, time for a bank, Produces: ",
            "Storge for gold just incase, Produces: ",
            "All of this gold has to go somewhere, Produces: ",
            "Where is the rocket gonna land? Produces: ",
            "Gotta make it yours huh? Produces: ",
            "Your gonna grow gold now, but on the moon! Produces: "
        ],

        purchase: function(index) {
            if (game.gold >= this.cost[index]){
                game.gold -= this.cost[index]
                this.amount[index]++
                this.owned[index] = true
                this.cost[index] = Math.floor(this.cost[index] * 1.25)
                display.updateScore()
                this.spawn()
                game.perk.spawn()
            }
        },

        spawn: function(){
            document.getElementById("sectionRight").innerHTML = ""
            for(i=0; i<this.name.length; i++){
                document.getElementById("sectionRight").innerHTML += `<div class="upgrade" id="upgrade${i}" onclick="game.upgrade.purchase(${i})" title="${this.description[i] + this.income[i]} Gold"><table><tr><td><img src="${this.image[i]}" class="upgrade-img" id="image"></td><td id="nameAndCost"><p>${this.name[i]}</p><p id="cost"><p>Cost: </p>${this.cost[i]}</p></td><td id="amount"><p>${this.amount[i]}</p></td></tr></table></div>`
            }
            //if (game.gold > this.cost[0]){
              //  document.getElementById("upgrade0").style.border = "4px solid gray"
            //}
        },

        goldPerSecond: function(){
            game.goldPerSecond = 0;
            for(i=0; i<this.name.length; i++){
                game.goldPerSecond += this.income[i] * this.amount[i]
            }

            return game.goldPerSecond
        }
    },

    perk: {
        name: [
            "Clicker Syndrome, ",
            "Cursor Help, ",
            "Clicker Addiction, ",
            "Better Shovel, ",
            "Faster Minecarts, ",
            "Bigger Mountains, ",
            "Better Lock, ",
            "Bigger Bank, ",
            "Better Bunker, ",
            "Faster Rocket, ",
            "Bigger Moons, ",
            "Bigger Base, ",
            "Faster Research, "
        ],

        owned: [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false
        ],

        cost: [
            100,
            1000,
            1000,
            1000,
            5000,
            10000,
            15000,
            50000,
            100000,
            100000,
            55,
            55000000,
            100000000,
            500000000
        ],

        index: [
            false,
            0,
            false,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10
        ],

        need: [
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1
        ],

        output: [
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2
        ],

        image: [
            "clicker.jpg",
            "cursor.webp",
            "clicker.jpg",
            "shovel.png",
            "mining_cart.jpg",
            "mountain.jpg",
            "safe.png",
            "bank.png",
            "bunker.jpg",
            "rocket.png",
            "moon.png",
            "moon-base.png",
            "lab.jpg"
        ],

        description: [
            "This will double you click value Cost: ",
            "This will double your cursors. Cost: ",
            "This will double you click value Cost: ",
            "You get a better shovel Cost: ",
            "This doubles your minecart Cost: ",
            "This doubles your mountain income, Cost: ",
            "This doubles your safes income, Cost: ",
            "This doubles your banks income, Cost: ",
            "This doubles your bunkers income, Cost: ",
            "This doubles your rockets income, Cost: ",
            "This doubles your moons income, Cost: ",
            "This doubles your moon base income, Cost: ",
            "This doubles your moon lab income, Cost: "
        ],
        
        type: [
            0,
            1,
            0,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1
        ],

        purchase: function(index) {
            if (game.gold >= this.cost[index]){
                // Click
                if (this.type[index] == 0){
                    if (this.need[index] <= game.clicked){
                        game.gold -= this.cost[index]
                        this.owned[index] = true
                        game.clickValue = game.clickValue * this.output[index]
                        this.spawn()
                        display.updateScore()
                        console.log("purchase")
                    }
                }
                // upgrade
                if (this.type[index] == 1){
                    if (this.need[index] <= game.upgrade.amount[this.index[index]]){
                        game.gold -= this.cost[index]
                        this.owned[index] = true
                        game.upgrade.income[this.index[index]] = game.upgrade.income[this.index[index]] * this.output[index]
                        this.spawn()
                        display.updateScore()
                    }
                }
            }
        },

        spawn: function() {
            document.getElementById("sectionTopRight").innerHTML = ""
            for (i=0; i<this.name.length; i++){
                if (this.owned[i] == false){
                    // click
                    if (this.type[i] == 0){
                        if (this.need[i] <= game.clicked){
                            document.getElementById("sectionTopRight").innerHTML += `<div class="perk" onclick="game.perk.purchase(${i})"><div class="perk-img"><img src="${this.image[i]}" title="${this.name[i] + this.description[i] + this.cost[i]}"></div></div>`
                        }
                    }
                    if (this.type[i] == 1){
                        if (this.need[i] <= game.upgrade.amount[this.index[i]]){
                            document.getElementById("sectionTopRight").innerHTML += `<div class="perk" onclick="game.perk.purchase(${i})"><div class="perk-img"><img src="${this.image[i]}" title="${this.name[i] + this.description[i] + this.cost[i]}"></div></div>`
                        }  
                    }
                }
            }
            
        }

    },

    data: {
        saveGame: function(){
            var gameSave = {
                gold: game.gold,
                clickValue: game.clickValue,
                totalClicks: game.clicked,
                totalGold: game.totalGold,
                goldPerSecond: game.goldPerSecond,
                upgradeCost: game.upgrade.cost,
                upgradeAmount: game.upgrade.amount,
                upgradeIncome: game.upgrade.income,
                perkOwned: game.perk.owned
            }

            localStorage.setItem("gameSave", JSON.stringify(gameSave))
        },

        loadGame: function(){
            var savedGame = JSON.parse(localStorage.getItem("gameSave"))
            if (localStorage.getItem("gameSave") !== null){
                if (typeof savedGame.gold !== "undefined") game.gold = savedGame.gold
                if (typeof savedGame.clickValue !== "undefined") game.clickValue = savedGame.clickValue
                if (typeof savedGame.totalClicks !== "undefined") game.clicked = savedGame.totalClicks
                if (typeof savedGame.totalGold !== "undefined") game.totalGold = savedGame.totalGold
                if (typeof savedGame.goldPerSecond !== "undefined") game.goldPerSecond = savedGame.goldPerSecond
                if (typeof savedGame.upgradeCost !== "undefined") {
                    for (i=0; i < savedGame.upgradeCost.length; i++){
                        game.upgrade.cost[i] = savedGame.upgradeCost[i];
                    }
                }
                if (typeof savedGame.upgradeAmount !== "undefined") {
                    for (i=0; i < savedGame.upgradeAmount.length; i++){
                        game.upgrade.amount[i] = savedGame.upgradeAmount[i];
                    }
                }
                if (typeof savedGame.upgradeIncome !== "undefined") {
                    for (i=0; i < savedGame.upgradeIncome.length; i++){
                        game.upgrade.income[i] = savedGame.upgradeIncome[i];
                    }
                }
                if (typeof savedGame.perkOwned !== "undefined") {
                    for (i=0; i < savedGame.perkOwned.length; i++){
                        game.perk.owned[i] = savedGame.perkOwned[i];
                    }
                }
            }
        },

        resetGame: function() {
            if (confirm("Are you Sure you want to reset you game?")) {
                var gameSave = {};
                localStorage.setItem("gameSave", JSON.stringify(gameSave));
                location.reload();
            }
        },

        debug: function(gold, clickval, index, amount){
            game.gold += gold
            game.clickValue += clickval
            game.upgrade.amount[index] += amount
            var message = "Done"
            return message
        }
    }
}




/*function canvas_spawn(){
    document.getElementById("sectionMiddle").innerHTML = ""
    // 0
    document.getElementById("sectionMiddle").innerHTML += `<canvas class="canvas" id="canvas0" width="530px"></canvas>`
    for (i=0; i<game.upgrade.amount[i]; i++){
        document.getElementById("sectionMiddle").innerHTML += `<img id="img0-${i}" src="cursor.webp" height="64px">`
    }
    const canvas0 = document.getElementById("canvas0");
    const ctx0 = canvas0.getContext('2d')
    for (i=0; i<game.upgrade.amount[i]; i++){
        const img0 = document.getElementById("img0-"+i);
    }
    for (i=0; i<game.upgrade.amount[i]; i++){
        ctx0.drawImage(img0, 10+i, 10, innerWidth=64, innerHeight=64)
    }
}
*/

var display = {
    updateScore: function(){
        document.getElementById("gold").innerHTML = Math.ceil(game.gold);
        document.title  = Math.ceil(game.gold) + " Gold - Gold Clicker"
        document.getElementById("gps").innerHTML = game.upgrade.goldPerSecond()
    },

    gps: function(){
        game.gold += game.upgrade.goldPerSecond()
    }
}

window.onload = function(){
    game.data.loadGame()
    display.updateScore()
    game.upgrade.spawn()
    game.perk.spawn()
    game.upgrade.goldPerSecond()
    game.data.saveGame()
}

var tick = setInterval(function() {
    display.updateScore()
    game.upgrade.spawn()
    game.perk.spawn()
    game.upgrade.goldPerSecond()
    display.gps()
}, 1000)

var tick30 = setInterval(function(){
    game.data.saveGame()
    console.log("Game Saved")
}, 30000)